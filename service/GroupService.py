from dao.GroupDAO import GroupDAO
from service.UserService import UserService


class GroupService:
    groupDAO = GroupDAO()
    userService = UserService()

    @classmethod
    def createGroup(cls, data, headers):
        try:
            user = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            if user is not None:
                responseData = cls.groupDAO.createGroup(data, user)
                return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def inviteMemberToGroup(cls, data, headers):
        try:
            currentUser = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            if currentUser is not None:
                cls.checkIfMemberAlreadyInvitedForGroup(data.get('group_id'), data.get("user_id"))
                group = cls.getGroupDetailsByGroupId(data.get('group_id'))
                toInviteUser = cls.userService.getUserDetailsByUserId(data.get("user_id"))
                responseData = cls.groupDAO.inviteMemberToGroup(data, currentUser, group, toInviteUser)
                return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def getGroupDetailsByGroupId(cls, group_id):
        try:
            responseData = cls.groupDAO.getGroupDetailsByGroupId(group_id)
            return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def acceptInvite(cls, data, headers):
        try:
            currentUser = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            invite = cls.getInviteDetailsByInviteId(data.get("invite_id"))
            group = cls.getGroupDetailsByGroupId(invite.get("group_id"))
            responseData = cls.groupDAO.acceptInvite(invite, group)
            return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def getInviteDetailsByInviteId(cls, inviteId):
        try:
            responseData = cls.groupDAO.getInviteDetailsByInviteId(inviteId)
            return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def addExpenses(cls, data, headers):
        try:
            user = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            group = cls.getGroupDetailsByGroupId(data.get("group_id"))
            responseData = cls.groupDAO.addExpenses(data, group, user)
            return responseData

        except Exception as e:
            raise e.__class__

    @classmethod
    def getMembersGroups(cls, headers):
        try:
            user = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            groups = cls.groupDAO.getMembersGroups(user.get("id"))

            return groups

        except Exception as e:
            raise e.__class__

    @classmethod
    def getGroupExpensesList(cls, headers, data):
        try:
            user = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))
            expenses = cls.groupDAO.getGroupExpensesList(data)

            return expenses

        except Exception as e:
            raise e.__class__

    @classmethod
    def searchForMember(cls, headers, data):
        try:
            user = cls.userService.checkIfUserLoggedIn(headers.get("session_id"))

            users = cls.groupDAO.searchForMember(data, user.get('id'))

            return users

        except Exception as e:
            raise e.__class__

    @classmethod
    def checkIfMemberAlreadyInvitedForGroup(cls, group_id, member_id):
        try:

            invite = cls.groupDAO.checkIfMemberAlreadyInvitedForGroup(group_id, member_id)

            return invite

        except Exception as e:
            raise e.__class__
