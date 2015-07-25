import sqlite3
import json
from flask import Flask, render_template, request, g

DATABASE = '/Users/AppBs/Work_master/Hackathon2015_5_25/event_map/app/db/event_map'
DEBUG = True

app = Flask(__name__)
app.config.from_envvar('settings', silent=True)

def connect_db():
    return sqlite3.connect(DATABASE)

def query_db(query, args=(), one=False):
    cur = connect_db().cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.connection.close()
    return (r[0] if r else None) if one else r

@app.route('/', methods=['GET', 'POST'])
def home():
	c = query_db('SELECT * FROM event')
	event_dict = json.dumps(c)
	c = query_db('SELECT * FROM building')
	build_dict = json.dumps(c)
	return("<html><body> %s <br><br> %s </body></html>" %(event_dict, build_dict))
	if request.method == 'GET':
		return render_template('home.html')
	if request.method == 'POST':
		return("<html><body> %s %s </body></html>" %(request.form['deadline'], request.form['seminar'])) 

@app.route('/about')
def about():
	return render_template('about.html')	

if __name__ == '__main__':
	app.run(debug=True)	

@app.teardown_appcontext
def close_db(error):
    g.db.close()