import pymysql
from app import app
from dbconfig import mysql
from flask import jsonify
from flask import flash, request

from controller import UserController
from controller import GroupController
if __name__ == "__main__":
    app.run(debug="True",host='0.0.0.0',port='80')



