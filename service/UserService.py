import uuid
from random import randint

from Exceptions.UserNameExists import UserNameExists
from dao.UserDAO import UserDAO
from service.EmailService import EmailService


class UserService:
    userDAO = UserDAO()
    emailService = EmailService()

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
    def getUsersShareInGroup(cls, headers, data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getUsersShareInGroup(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def requestForSettlement(cls, headers, data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.requestForSettlement(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getMembersExpensesInGroup(cls, headers, data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getMembersExpensesInGroup(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def getRequestForSettlemets(cls, headers, data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.getRequestForSettlemets(data, currentUser.get('id'))
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def settleBalanaceForGroup(cls, headers, data):
        currentUser = cls.checkIfUserLoggedIn(headers.get('session_id'))

        try:
            responseData = cls.userDAO.settleBalanaceForGroup(data)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def sendForgotpasswordMail(cls, data):
        cls.checkIfUserExistsWithEmailId(data.get('email'))
        try:
            responseData = cls.userDAO.sendForgotpasswordMail(data)
            message = "your otp for changing password is " + responseData.get('otp')
            cls.emailService.sendEmail(data.get('email'), message)
            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def changePassword(cls, data):
        cls.checkIfUserExistsWithEmailId(data.get('email'))
        try:
            responseData = cls.userDAO.changePassword(data)

            return responseData
        except Exception as e:
            raise e.__class__

    @classmethod
    def checkIfUserExistsWithEmailId(cls, email):

        try:
            responseData = cls.userDAO.checkIfUserExistsWithEmailId(email)
            return responseData
        except Exception as e:
            raise e.__class__
