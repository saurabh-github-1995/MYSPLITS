import uuid

import pymysql
from CustomUtils import *
from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
from Exceptions.UserNameCannotBeNull import UserNameCannotBeNull
from Exceptions.UserNameExists import UserNameExists
from dbconfig import mysql


class UserDAO:
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
            return cls.findSpecificError(str(e))

        finally:
            cursor.close()
            conn.close()

    @classmethod
    def findSpecificError(cls, errorString):
        if "for key 'user_name'" in errorString:
            raise UserNameExists
        elif "Column 'user_name' cannot be null" in errorString:
            raise UserNameCannotBeNull
        elif "for key 'email'" in errorString:
            raise EmailExists
        elif "Column 'email' cannot be null":
            raise EmailCannotBeNull
        else:
            raise Exception
