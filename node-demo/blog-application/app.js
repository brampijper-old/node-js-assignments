//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require('body-parser')
const session		= require('express-session')
const app 			= express()

//connecting string to the database.
let db = new sequelize ('blog_application', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Load the files in the resource folder.
app.use('/resources', express.static(__dirname + '/resources'))

//set the pug engine and the view folder with the .pug files. 
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

//Define the database structure
let User = db.define('user', {
	username: 	sequelize.STRING,
	email: 		sequelize.STRING,
	password: 	sequelize.STRING 
})

let Message = db.define('message', {
	note: 		sequelize.STRING,
	user_id: 	sequelize.INTEGER
})

let Comment = db.define('comment', {
	opinion: 	sequelize.STRING,
	user_id: 	sequelize.INTEGER,
	message_id: sequelize.INTEGER
})

//test if the webserver is working
app.get('/ping', (req, res) => {
	res.send('pong')
})

//Syncing with the database
db.sync({force: true}).then(function () {
	console.log("succesfully synced with the db")
})

//Start the web-server on port 8000
app.listen(8000, () => {
	console.log('Yaay, web-server is running!')
})