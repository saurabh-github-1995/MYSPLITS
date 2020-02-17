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
