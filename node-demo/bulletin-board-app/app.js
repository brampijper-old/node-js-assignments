const fs = require ('fs')
const express = require ('express')
const pg = require ('pg')
const app = express()
const bodyParser = require ('body-parser')

app.use(express.static('static'))
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({extended: true})); 

//Database stuff
let connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

app.get('/index', (req, res) => {
	res.render('index')
})

app.get('/showMessages', (req, res) => {

	pg.connect(connectionString, (err, client, done) => {
		console.log('succesfully connected to db')

		client.query('select title, body from messages;', [], (err, result) => {
			if(err) {
				throw err; 
			}
			res.render('showMessages', {result: result.rows})
			console.log(result.rows)
			done()
			pg.end()
		})
	})
})

app.post('/add', (req, res) => {
	console.log('data sended to the database')
	let post = {title: req.body.title, message: req.body.message}

	//Connect to Database
	pg.connect(connectionString, (err, client, done) => {
		console.log('succesfully connected to db')

		client.query('INSERT INTO messages (title, body) values ($1, $2)', [post.title, post.message], (err) => {
			if(err) {
				throw err;
			} 
			console.log("Yup it worked")
		done();
		pg.end();
		})
	})
})

app.listen(8000, () => {
	console.log('Yaay, server running')
})