from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
from Exceptions.GroupNameCannotBeNull import GroupNameCannotBeNull
from Exceptions.UserNameCannotBeNull import UserNameCannotBeNull
from Exceptions.UserNameExists import UserNameExists


class CustomUtils:
    SUCCESSFULL = 1
    SOMETHING_WENT_WRONG = -1
    USER_NAME_EXIST = -2
    EMAIL_EXISTS = -3
    USER_NAME_CANNOT_BE_NULL = -4
    EMAIL_CANNOT_BE_NULL = -5
    WRONG_CREDENTIALS = -6
    USER_NOT_LOGGED_IN = -7
    GROUP_NAME_CANNOT_BE_NULL = -8

    @classmethod
    def findSpecificError(cls, errorString):
        if "for key 'user_name'" in errorString:
            raise UserNameExists
        elif "Column 'user_name' cannot be null" in errorString:
            raise UserNameCannotBeNull
        elif "for key 'email'" in errorString:
            raise EmailExists
        elif "Column 'name' cannot be null" in errorString:
            raise GroupNameCannotBeNull
        elif "Column 'email' cannot be null" in errorString:
            raise EmailCannotBeNull
        else:
            raise Exception
