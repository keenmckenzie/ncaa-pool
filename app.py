from flask import jsonify
import os
from ncaa import app
from flask_mysqldb import MySQL

if __name__ == "__main__":
    #app.run(debug=True, host='0.0.0.0')
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

