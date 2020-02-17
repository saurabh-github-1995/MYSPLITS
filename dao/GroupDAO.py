import uuid

import pymysql
from CustomUtils import *
from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
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
                "INSERT INTO app_group (id, name, group_avtar, discription, created_by, type, created_by_name) VALUES (%s,%s,%s,%s,%s,%s,%s)",
                (group_id, data.get("name"), data.get("group_avtar"), data.get("discription"), user.get("id"),
                 data.get("type"), user.get("full_name")))
            conn.commit()

            cursor.execute("SELECT * FROM app_group WHERE id=%s", group_id)
            group = cursor.fetchone()
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



