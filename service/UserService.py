import uuid
from random import randint

from Exceptions.UserNameExists import UserNameExists
from dao.UserDAO import UserDAO


class UserService:
    userDAO = UserDAO()

    @classmethod
    def userRegistration(cls, data):
        try:
            responseData = cls.userDAO.userRegistration(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def loginUser(cls, data):
        try:
            responseData = cls.userDAO.loginUser(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def checkIfUserLoggedIn(cls, sessionId):
        try:
            responseData = cls.userDAO.checkIfUserLoggedIn(sessionId)
            return responseData
        except Exception as e:
            raise e.__class__
