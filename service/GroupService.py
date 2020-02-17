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
