from flask import jsonify

from ncaa import app
from flask_mysqldb import MySQL


app.run(debug=True, host='0.0.0.0')
