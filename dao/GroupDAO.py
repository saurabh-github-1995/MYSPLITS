import uuid
from datetime import datetime

import pymysql
from CustomUtils import *
from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
from Exceptions.GroupDoesNotExists import GroupDoesNotExists
from Exceptions.InviteDoesNotExists import InviteDoesNotExists
from Exceptions.UserNameCannotBeNull import UserNameCannotBeNull
from Exceptions.UserNameExists import UserNameExists
from Exceptions.UserNotLoggedIn import UserNotLoggedIn
from Exceptions.WrongCredentials import WrongCredentials
from dbconfig import mysql


class GroupDAO:
    customUtils = CustomUtils()

    @classmethod
    def createGroup(cls, data, user):
        try:
            group_id = str(uuid.uuid4())
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(
                "INSERT INTO app_group (id, name, group_avtar, discription, created_by, type, created_by_name, currency) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                (group_id, data.get("name"), data.get("group_avtar"), data.get("discription"), user.get("id"),
                 data.get("type"), user.get("full_name"), data.get("currency")))
            conn.commit()

            cursor.execute("SELECT * FROM app_group WHERE id=%s", group_id)
            group = cursor.fetchone()

            member_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO group_members (id, group_name, group_id, member_name, member_id, created_by_name, created_by_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                (member_id, group.get("name"), group.get("id"), user.get("full_name"), user.get("id"),
                 group.get("created_by_name"), group.get("created_by")))
            conn.commit()
            return group

        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def getGroupDetailsByGroupId(cls, group_id):
        print("*******")
        print(group_id)
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute("SELECT * FROM app_group WHERE id=%s", group_id)
            group = cursor.fetchone()
            if group is not None:
                return group
            else:
                raise GroupDoesNotExists

        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def inviteMemberToGroup(cls, data, currentUser, group, toInviteUser):
        try:
            id = str(uuid.uuid4())
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(
                "INSERT INTO group_invites (id, group_id, group_name, invited_by_id, invited_by_name, invited_to_id, invited_to_name) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (id, group.get("id"), group.get("name"), currentUser.get("id"), currentUser.get("full_name"),
                 toInviteUser.get("id"), toInviteUser.get("full_name")))
            conn.commit()

            return None
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def getInviteDetailsByInviteId(cls, inviteId):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute("SELECT * FROM group_invites WHERE id=%s", inviteId)
            invite = cursor.fetchone()
            if invite is not None:
                return invite
            else:
                raise InviteDoesNotExists
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def acceptInvite(cls, invite, group):
        try:
            id = str(uuid.uuid4())
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(
                "INSERT INTO group_members (id, group_name, group_id, member_name, member_id, created_by_name, created_by_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                (id, group.get("name"), group.get("id"), invite.get("invited_to_name"), invite.get("invited_to_id"),
                 group.get("created_by_name"), group.get("created_by")))
            conn.commit()

            cursor.execute("UPDATE group_invites gi SET gi.invitation_status = 'ACCEPTED' WHERE gi.id = %s",
                           invite.get("id"))
            conn.commit()
            cls.addMemebrMapping(invite, group.get("id"))
            return None
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def addExpenses(cls, data, group, user):
        try:
            id = str(uuid.uuid4())
            datestring = data.get("paid_date")
            dt = datetime.strptime(datestring, '%Y-%m-%d')
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(
                "INSERT INTO expenses (id, description, amount, group_id, group_name, paid_by_id, paid_by_name, paid_for, paid_date, day, month, year) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                (id, data.get("description"), data.get("amount"), group.get("id"), group.get("name"), user.get("id"),
                 user.get("full_name"), data.get("paid_for"), data.get("paid_date"), dt.day, dt.month, dt.year))
            conn.commit()

            cursor.execute("SELECT * FROM expenses e where e.id = %s", id)
            expense = cursor.fetchone()
            cls.splitExpenses(expense)
            return expense
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def addMemebrMapping(cls, invite, groupId):
        try:

            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute("SELECT * FROM group_members gm where gm.group_id = %s AND gm.member_id != %s",
                           (groupId, invite.get("invited_to_id")))
            members = cursor.fetchall()

            for member in members:
                mappingid = str(uuid.uuid4())
                mappingid1 = str(uuid.uuid4())
                cursor.execute(
                    "INSERT INTO expenses_splits (id, groupd_id, group_name, owes_member_id, owes_member_name, owes_to_member_name, owes_to_member_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                    (mappingid, groupId, invite.get("group_name"), invite.get("invited_to_id"),
                     invite.get("invited_to_name"), member.get("member_name"), member.get("member_id")))
                conn.commit()
                cursor.execute(
                    "INSERT INTO expenses_splits (id, groupd_id, group_name, owes_member_id, owes_member_name, owes_to_member_name, owes_to_member_id) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                    (mappingid1, groupId, invite.get("group_name"), member.get("member_id"),
                     member.get("member_name"), invite.get("invited_to_name"), invite.get("invited_to_id")))
                conn.commit()

            return None
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def splitExpenses(cls, expense):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute("SELECT * FROM expenses_splits es WHERE es.groupd_id = %s", expense.get("group_id"))
            members_mapping = cursor.fetchall()

            cursor.execute("SELECT * FROM group_members gm WHERE gm.group_id = %s", expense.get("group_id"))
            group_members = cursor.fetchall()

            contribution = expense.get("amount") / len(group_members)
            negContribution = -contribution
            for mapping in members_mapping:
                if expense.get("paid_by_id") == mapping.get("owes_to_member_id"):
                    cursor.execute("UPDATE expenses_splits es SET es.amount = es.amount+ %s WHERE es.id = %s",
                                   (contribution, mapping.get("id")))
                    conn.commit()
                elif expense.get("paid_by_id") == mapping.get("owes_member_id"):
                    cursor.execute("UPDATE expenses_splits es SET es.amount = es.amount+ %s WHERE es.id = %s",
                                   (negContribution, mapping.get("id")))
                    conn.commit()
            return None
        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()
