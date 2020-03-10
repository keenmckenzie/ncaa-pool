from flask import Flask, jsonify
from ncaa import api
from flask_mysqldb import MySQL
from db_config import host, user, password, name


app = Flask(__name__)

app.config['MYSQL_HOST'] = host
app.config['MYSQL_USER'] = user
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = name
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

db = MySQL(app)

from ncaa.api.routes import mod

app.register_blueprint(api.routes.mod)
