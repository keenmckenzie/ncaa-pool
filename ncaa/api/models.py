from ncaa import db


def get_picks(user):
    userId = get_userId(user)
    cur = db.connection.cursor()
    query = ('select match_id, pick '
             'from picks '
             'where user_id = ' + str(userId))
    cur.execute(query)
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


def post_picks(userId, match, pick):
    cur = db.connection.cursor()
    sql = ('insert into picks (user_id, match_id, pick) '
           'values (' + str(userId) + ', ' + str(match) + ', \'' + pick + '\')')
    cur.execute(sql)
    db.connection.commit()
