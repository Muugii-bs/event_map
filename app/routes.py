import sqlite3
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
	if request.method == 'GET':
		return render_template('home.html')
	if request.method == 'POST':
		return("<html><body> %s %s </body></html>" %(request.form['deadline'], request.form['seminar'])) 

@app.route('/about')
def about():
	return render_template('about.html')	

if __name__ == '__main__':
	app.run(debug=True)	
