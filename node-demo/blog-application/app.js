//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const promise 		= require ('promise')
const cookieParser 	= require ('cookie-parser')
const app 			= express()

//connecting string to the database.
let db = new sequelize ('blog_application', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Load the files in the resource folder.
app.use('/resources', express.static(__dirname + '/resources'))

//Make the bodyparser accessible everywhere
app.use(bodyParser.urlencoded({extended: true})); 

app.use(cookieParser())
app.use(session({secret: 'i dont know what this is'}))

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

//Log-in page
app.get('/', (req, res) => {
	res.render('index')
})

//register page
app.get('/register', (req, res) => {
	res.render('register')
})

app.get('/profile', (req, res) => {
	res.render('profile', {
		userName: req.session.userName
	})
})

//adds new user to the database
app.post('/create', (req, res) => {
	if (req.body.username && req.body.email && req.body.password !== 0) {
		User.create({
			username: req.body.username,
			email: req.body.email, 
			password: req.body.password
		}).then(function () {
			db.sync().then(function() {
				console.log('User Added')
				res.redirect('/')
			})
		})
	} 
})

//Check if log-in credentials matches
app.post('/login', (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function (user) {
		if(user !== null && req.body.password === user.password) {
			req.session.userName = user.username
			console.log('succesfully logged in')
			res.redirect('/profile')
		} else {
			console.log('wrong log-in credentials')
			res.redirect('/')
		}
	})
})

//Start the web-server on port 8000
app.listen(8000, () => {
	console.log('Yaay, web-server is running!')
})