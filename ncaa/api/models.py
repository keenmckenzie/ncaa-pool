from ncaa import db
import hashlib, binascii, os


class User:
    def __init__(self, user_name, password):
        self.user_name = user_name
        self.password = hash_password(password)

    def post_user(self):
        cur = db.connection.cursor()
        sql = ('insert into users (userName, password) '
               'values ( %(user_name)s , %(password)s )')
        data = {
            'user_name': self.user_name,
            'password': self.password
        }
        cur.execute(sql, data)
        try:
            db.connection.commit()
            return {"result": "success"}
        except:
            return {"result": "failure"}

class Match:
    def __init__(self, weight='null', round='null', wrestler_1='null', wrestler_2='null'):
        self.weight = weight
        self.round = round
        self.wrestler_1 = wrestler_1
        self.wrestler_2 = wrestler_2

    def post_match(self):
        cur = db.connection.cursor()
        sql = ('insert into matches (weight, round, wrestler_1, wrestler_2) '
               'values ( %(weight)s, %(round)s, %(wrestler_1)s, %(wrestler_2)s)')
        data = {
            'weight': self.weight,
            'round': self.round,
            'wrestler_1': self.wrestler_1,
            'wrestler_2': self.wrestler_2
        }
        cur.execute(sql, data)
        try:
            db.connection.commit()
            return {'result': 'success'}
        except:
            return {'result': 'failure'}

    def update_wrestlers(self, wrestler_1, wrestler_2, match_id):
        cur = db.connection.cursor()
        sql = ('update matches '
               'set wrestler_1 = %(wrestler_1)s, wrestler_2 = %(wrestler_2)s '
               'where id = %(match_id)s')
        data = {
            'wrestler_1': wrestler_1,
            'wrestler_2': wrestler_2,
            'match_id': match_id
        }
        cur.execute(sql, data)
        try:
            db.connection.commit()
            return {'result': 'success'}
        except:
            return {'result': 'failure'}

    def update_winner(self, winner, match_id):
        cur = db.connection.cursor()
        sql = ('update matches '
               'set winner = %(winner)s '
               'where id = %(match_id)s')
        data = {
            'winner': winner,
            'match_id': match_id
        }
        cur.execute(sql, data)
        try:
            db.connection.commit()
            return {'result': 'success'}
        except:
            return {'result': 'failure'}


def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

def get_picks(user):
    userId = {'userId':user}
    cur = db.connection.cursor()
    query = ('select * '
             'from picks '
             'where user_id = %(userId)s ')
    cur.execute(query, userId)
    results = cur.fetchall()
    return results

def matches_with_picks(user):
    userId = {'userId':user}
    cur = db.connection.cursor()
    query = ('select match_id, pick, round, user_id, weight, wrestler_1, wrestler_2, winner '
             'from picks '
             'join matches on matches.id = picks.match_id '
             'where user_id = %(userId)s ')
    cur.execute(query, userId)
    results = cur.fetchall()
    return results


def get_userId(user):
    cur = db.connection.cursor();
    query = ('select id '
             'from users '
             'where userName = \'' + user + '\'')
    cur.execute(query)
    results = cur.fetchall()
    userId = results[0]['id']
    return userId

def verify_user(user, password):
    cur = db.connection.cursor();
    query = ('select password, id '
             'from users '
             'where userName = \'' + user + '\'')
    cur.execute(query)
    results = cur.fetchall()
    stored_password = results[0]['password']
    user_id = results[0]['id']
    authorized = verify_password(stored_password, password)
    if authorized:
        return {
            "auth": authorized,
            "userId": user_id
        }
    else:
        return {"auth":authorized}


def post_picks(userId, match, pick):
    cur = db.connection.cursor()
    sql = ('insert into picks (user_id, match_id, pick) '
           'values (' + str(userId) + ', ' + str(match) + ', \'' + pick + '\')')
    cur.execute(sql)
    db.connection.commit()

def get_matches():
    cur = db.connection.cursor()
    sql = ('select * from matches')
    cur.execute(sql)
    results = cur.fetchall()
    return results