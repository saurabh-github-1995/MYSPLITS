from Exceptions.UserNameExists import UserNameExists
from app import app
from service.UserService import UserService
from flask import flash, request
from CustomUtils import *

userService = UserService()


@app.route('/userRegistration', methods=['POST'])
def userRegistration():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.userRegistration(request.json)

        wsResponse['resultSet'] = responseDate
        wsResponse['operationStatus'] = CustomUtils.SUCCESSFULL

    except Exception as e:
        if e.__class__ != "EXCEPTION":
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = e.STATUS_CODE
        else:
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = CustomUtils.SOMETHING_WENT_WRONG
    return wsResponse


@app.route('/loginUser', methods=['POST'])
def loginUser():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.loginUser(request.json)

        wsResponse['resultSet'] = responseDate
        wsResponse['operationStatus'] = CustomUtils.SUCCESSFULL

    except Exception as e:
        if e.__class__ != "EXCEPTION":
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = e.STATUS_CODE
        else:
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = CustomUtils.SOMETHING_WENT_WRONG
    return wsResponse
