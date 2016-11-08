//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require('body-parser')
const app 			= express()

//connecting string to the database.
let db = new sequelize ('users', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Load the files in the resource folder.
app.use('/resources', express.static(__dirname + '/resources'))

//set the pug engine and the view folder with the .pug files. 
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

//test if the webserver is working
app.get('/ping', (req, res) => {
	res.send('pong')
})

//Start the web-server on port 8000
app.listen(8000, () => {
	console.log('Yaay, web-server is running!')
})