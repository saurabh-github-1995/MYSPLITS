from Exceptions.AmountCannotBeNull import AmountCannotBeNull
from Exceptions.EmailCannotBeNull import EmailCannotBeNull
from Exceptions.EmailExists import EmailExists
from Exceptions.GroupNameCannotBeNull import GroupNameCannotBeNull
from Exceptions.PaidForCannotBeNull import PaidForCannotBeNull
from Exceptions.PasswordCannotBeNull import PasswordCannotBeNull
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
    GROUP_DOES_NOT_EXISTS = -9
    USER_DOES_NOT_EXISTS = -10
    INVITE_DOES_NOT_EXISTS = -11
    AMOUNT_CANNOT_BE_NULL = -12
    PAID_FOR_CANNOT_BE_NULL = -13
    PASSWORD_CANNOT_BE_NULL = -14

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
        elif "Column 'amount' cannot be null" in errorString:
            raise AmountCannotBeNull
        elif "Column 'paid_for' cannot be null" in errorString:
            raise PaidForCannotBeNull
        elif "Column 'password' cannot be null" in errorString:
            raise PasswordCannotBeNull
        else:
            raise Exception
