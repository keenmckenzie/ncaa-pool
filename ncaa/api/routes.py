from flask import Blueprint, request, render_template, jsonify
from ncaa import db
from .models import get_picks, get_userId, post_picks, get_matches, matches_with_picks, User, verify_user

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

@mod.route('/match-picks')
def match_picks():
    user = request.args.get('user')
    results = matches_with_picks(user)
    return jsonify(results)

@mod.route('/matches', methods=['GET'])
def matches():
    results = get_matches()
    return jsonify(results)

@mod.route('/add-user', methods=['POST'])
def add_user():
    user_name = request.args.get('userName')
    password = request.args.get('password')
    user = User(user_name, password)
    commit = user.post_user()
    return commit

@mod.route('/authorize-user', methods=['GET'])
def auth_user():
    user_name = request.args.get('userName')
    password = request.args.get('password')
    auth = verify_user(user_name, password)
    return auth

@mod.route('/userId')
def userId():
    user = request.args.get('user')
    userId = get_userId(user)
    return {"id": str(userId)}


