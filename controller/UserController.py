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


@app.route('/checkIfUserLoggedIn', methods=['POST'])
def checkIfUserLoggedIn():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.checkIfUserLoggedIn(request.headers.get('session_id'))

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


@app.route('/getAllUsersExceptSelf', methods=['POST'])
def getAllUsersExceptSelf():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getAllUsersExceptSelf(request.headers.get('session_id'))

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


@classmethod
@app.route('/getUserDetailsByUserId', methods=['POST'])
def getUserDetailsByUserId():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getUserDetailsByUserId(request.json.get('user_id'))

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

@classmethod
@app.route('/getInvitesOfUser', methods=['POST'])
def getInvitesOfUser():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getInvitesOfUser(request.headers)

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

@classmethod
@app.route('/getUserShares', methods=['POST'])
def getUserShares():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getUserShares(request.headers)

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


@classmethod
@app.route('/getUsersSpendingInTotal', methods=['POST'])
def getUsersSpendingInTotal():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getUsersSpendingInTotal(request.headers)

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


@classmethod
@app.route('/getUsersShareInGroup', methods=['POST'])
def getUsersShareInGroup():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = userService.getUsersShareInGroup(request.headers,request.json)

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