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
