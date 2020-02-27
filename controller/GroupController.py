from Exceptions.UserNameExists import UserNameExists
from app import app
from service.GroupService import GroupService
from service.UserService import UserService
from flask import flash, request
from CustomUtils import *

groupService = GroupService()


@app.route('/createGroup', methods=['POST'])
def createGroup():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.createGroup(request.json, request.headers)

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


@app.route('/inviteMemberToGroup', methods=['POST'])
def inviteMemberToGroup():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.inviteMemberToGroup(request.json, request.headers)

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


@app.route('/getGroupDetailsByGroupId', methods=['POST'])
def getGroupDetailsByGroupId():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.getGroupDetailsByGroupId(request.json.get("group_id"))

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


@app.route('/acceptInvite', methods=['POST'])
def acceptInvite():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.acceptInvite(request.json, request.headers)

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


@app.route('/getInviteDetailsByInviteId', methods=['POST'])
def getInviteDetailsByInviteId():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.getInviteDetailsByInviteId(request.json.get("id"))

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


@app.route('/addExpenses', methods=['POST'])
def addExpenses():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.addExpenses(request.json, request.headers)

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


@app.route('/getMembersGroups', methods=['POST'])
def getMembersGroups():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.getMembersGroups(request.headers)

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


@app.route('/getGroupExpensesList', methods=['POST'])
def getGroupExpensesList():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.getGroupExpensesList(request.headers, request.json)

        wsResponse['resultSet'] = responseDate
        wsResponse['operationStatus'] = CustomUtils.SUCCESSFULL

    except Exception as e:
        print("ERROR---------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(e)
        if e.__class__ != "EXCEPTION":
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = e.STATUS_CODE
        else:
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = CustomUtils.SOMETHING_WENT_WRONG
    return wsResponse


@app.route('/searchForMember', methods=['POST'])
def searchForMember():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.searchForMember(request.headers, request.json)

        wsResponse['resultSet'] = responseDate
        wsResponse['operationStatus'] = CustomUtils.SUCCESSFULL

    except Exception as e:
        print("ERROR---------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(e)
        if e.__class__ != "EXCEPTION":
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = e.STATUS_CODE
        else:
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = CustomUtils.SOMETHING_WENT_WRONG
    return wsResponse


@app.route('/getListOfCurrencies', methods=['POST'])
def getListOfCurrencies():
    wsResponse = {"resultSet": None, "operationStatus": None}

    try:
        responseDate = groupService.getListOfCurrencies()

        wsResponse['resultSet'] = responseDate
        wsResponse['operationStatus'] = CustomUtils.SUCCESSFULL

    except Exception as e:
        print("ERROR---------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(e)
        if e.__class__ != "EXCEPTION":
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = e.STATUS_CODE
        else:
            wsResponse['resultSet'] = None
            wsResponse['operationStatus'] = CustomUtils.SOMETHING_WENT_WRONG
    return wsResponse
