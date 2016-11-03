const fs = require ('fs')
const express = require ('express')
const pg = require ('pg')
const app = express()
const bodyParser = require ('body-parser')

//Load static files
app.use('/resources', express.static( __dirname + '/static'))

//Set the engine to pug and the view folder to the one in this location
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({extended: true})); 

//Database stuff
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

initialize (connection) => {
	connection = connectionString

}
