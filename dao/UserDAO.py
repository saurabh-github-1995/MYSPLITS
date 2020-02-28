import uuid

import pymysql
from CustomUtils import *
from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
from Exceptions.UserDoesNotExists import UserDoesNotExists
from Exceptions.UserNameCannotBeNull import UserNameCannotBeNull
from Exceptions.UserNameExists import UserNameExists
from Exceptions.UserNotLoggedIn import UserNotLoggedIn
from Exceptions.WrongCredentials import WrongCredentials
from dbconfig import mysql


class UserDAO:
    customUtils = CustomUtils()

    @classmethod
    def userRegistration(cls, data):
        try:
            userid = str(uuid.uuid4())
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(
                "INSERT INTO users (id, user_name, password, email, birthdate, full_name) VALUES (%s,%s,%s,%s,%s,%s)", (
                    userid, data.get('user_name'), data.get('password'), data.get('email'), data.get('birthdate'),
                    data.get('full_name')))
            conn.commit()
            return None
        except Exception as e:
            print(e)
            return cls.customUtils.findSpecificError(str(e))

        finally:
            cursor.close()
            conn.close()

    @classmethod
    def loginUser(cls, data):
        try:
            session_id = str(uuid.uuid4())
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM users u WHERE u.user_name = %s AND u.password=%s",
                           (data.get('user_name'), data.get('password')))
            user = cursor.fetchall()
            print(len(user))
            if len(user) == 1:
                cursor.execute("UPDATE users u SET u.session_id = %s WHERE u.user_name = %s AND u.password=%s",
                               (session_id, data.get('user_name'), data.get('password')))
                conn.commit()
                cursor.execute("SELECT * FROM users u WHERE u.user_name = %s AND u.password=%s",
                               (data.get('user_name'), data.get('password')))
                user1 = cursor.fetchone()
                return user1
            else:
                raise WrongCredentials

        except Exception as e:
            print(e)
            # print(e.__class__)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def checkIfUserLoggedIn(cls, sessionId):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM users u WHERE u.session_id = %s",
                           sessionId)
            user = cursor.fetchone()
            if user is not None:
                return user
            else:
                raise UserNotLoggedIn

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
    def getUserDetailsByUserId(cls, user_id):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM users u WHERE u.id = %s",
                           user_id)
            user = cursor.fetchone()
            if user is not None:
                return user
            else:
                raise UserDoesNotExists

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
    def getAllUsersExceptSelf(cls, userid):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM users u WHERE u.id != %s ORDER BY u.full_name",
                           userid)
            users = cursor.fetchall()
            return users

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
    def getInvitesOfUser(cls, userid):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM group_invites gi WHERE gi.invited_to_id = %s ORDER BY gi.invited_on ASC",
                           userid)
            invites = cursor.fetchall()
            return invites

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
    def getUserShares(cls, userid):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM expenses_splits es WHERE es.owes_member_id = %s AND es.amount > 0",
                           userid)
            owes = cursor.fetchall()

            cursor.execute("SELECT * FROM expenses_splits es WHERE es.owes_to_member_id = %s AND es.amount > 0",
                           userid)
            owesFrom = cursor.fetchall()
            shares = {"owes": owes, "owesFrom": owesFrom}
            return shares

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
    def getUsersSpendingInTotal(cls, userid):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT *  FROM expenses e  WHERE e.paid_by_id = %s",
                           userid)
            expenses = cursor.fetchall()

            return expenses

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
    def getUsersShareInGroup(cls, data):
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * , SUM(e.amount) AS total FROM expenses e  WHERE e.group_id = %s GROUP BY e.paid_by_id",
                           data.get('group_id'))
            shares = cursor.fetchall()

            return shares

        except Exception as e:
            print(e)
            if str(e) != "":
                return cls.customUtils.findSpecificError(str(e))
            else:
                raise e.__class__
        finally:
            cursor.close()
            conn.close()
