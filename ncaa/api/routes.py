from flask import Blueprint, request, render_template, jsonify
from .models import get_picks, get_userId, post_picks, get_matches, matches_with_picks, User, verify_user, Match


mod = Blueprint('api', __name__)


@mod.route('/')
def test():
    return {"result": "test"}

##
## Pick Routes
##

@mod.route('/picks', methods=['GET', 'POST'])
def picks():
    if request.method == 'GET':
        '''
        json = request.get_json()
        user = json['user']
        '''
        user = request.args.get('user')
        results = get_picks(user)
        return jsonify(results)
    else:
        json = request.get_json()
        user = json['user']
        match_id = json['match']
        pick = json['pick']
        post_picks(user, match_id, pick)
        result = get_picks(user)
        return jsonify(result)

@mod.route('/match-picks')
def match_picks():
    json = request.get_json()
    user = json['user']
    results = matches_with_picks(user)
    return jsonify(results)


##
## User Routes
##

@mod.route('/add-user', methods=['POST'])
def add_user():
    json = request.get_json()
    user_name = json['userName']
    password = json['password']
    user = User(user_name, password)
    user.post_user()
    auth = verify_user(user_name, password)
    return auth

@mod.route('/authorize-user', methods=['GET'])
def auth_user():
    '''
    json = request.get_json()
    user_name = json['userName']
    password = json['password']
    '''
    user_name = request.args.get('userName')
    password = request.args.get('password')
    auth = verify_user(user_name, password)
    return auth

@mod.route('/userId')
def userId():
    json = request.get_json()
    user = json['userName']
    userId = get_userId(user)
    return {"id": str(userId)}


##
## Match Routes
##

@mod.route('/matches', methods=['GET'])
def matches():
    results = get_matches()
    return jsonify(results)


@mod.route('/add-match', methods=['POST'])
def add_match():
    json = request.get_json()
    json_weight = json['weight']
    json_wrestler_1 = json['wrestler1']
    json_wrestler_2 = json['wrestler2']
    json_round = json['round']
    match = Match(json_weight, json_round, json_wrestler_1, json_wrestler_2)
    commit = match.post_match()
    return commit

@mod.route('/update-winner', methods=['POST'])
def update_winner():
    json = request.get_json()
    winner = json['winner']
    match_id = json['id']
    match = Match()
    commit = match.update_winner(winner, match_id)
    return commit

