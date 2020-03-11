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
    userId = get_userId(user)
    cur = db.connection.cursor()
    query = ('select * '
             'from picks '
             'where user_id = ' + str(userId))
    cur.execute(query)
    results = cur.fetchall()
    return results

def matches_with_picks(user):
    userId = {'userId':get_userId(user)}
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