from flask import Blueprint, request, render_template, jsonify
from ncaa import db
from .models import get_picks, get_userId, post_picks

mod = Blueprint('api', __name__)


@mod.route('/')
def test():
    return {"result": "test"}


@mod.route('/picks', methods=['GET', 'POST'])
def picks():
    if request.method == 'GET':
        user = request.args.get('user')
        results = get_picks(user)
        return jsonify(results)
    else:
        user = request.args.get('user')
        userIdValue = get_userId(user)
        match_id = request.args.get('match')
        pick = request.args.get('pick')
        post_picks(userIdValue, match_id, pick)
        result = get_picks(user)
        return jsonify(result)


@mod.route('/userId')
def userId():
    user = request.args.get('user')
    userId = get_userId(user)
    return {"id": str(userId)}
