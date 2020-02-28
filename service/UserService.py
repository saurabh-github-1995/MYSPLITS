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

    @classmethod
    def getAllUsersExceptSelf(cls, session_id):
        currentUser = cls.checkIfUserLoggedIn(session_id)

        try:
            responseData = cls.userDAO.getAllUsersExceptSelf(currentUser.get('id'))
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getUserDetailsByUserId(cls, user_id):
        user = cls.userDAO.getUserDetailsByUserId(user_id)
        return user

    @classmethod
    def getInvitesOfUser(cls, headers):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getInvitesOfUser(currentUser.get('id'))
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getUserShares(cls, headers):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getUserShares(currentUser.get('id'))
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getUsersSpendingInTotal(cls, headers):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getUsersSpendingInTotal(currentUser.get('id'))
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getUsersShareInGroup(cls, headers,data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getUsersShareInGroup(data)
            return responseData
        except Exception as e:
            raise e.__class__
