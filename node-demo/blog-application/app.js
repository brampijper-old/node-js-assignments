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
app.use(session({
	secret: 'My ultra safe secret sentence',
	cookie: {maxAge: 365 * 24 * 60 * 60 * 1000}
}))

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
	note: 		sequelize.STRING
})

let Comment = db.define('comment', {
	opinion: 	sequelize.STRING
})

//Define relations
User.hasMany(Message)
User.hasMany(Comment)
Message.hasMany(Comment)
Message.belongsTo(User)
Comment.belongsTo(User)
Comment.belongsTo(Message)

//test if the webserver is working
app.get('/ping', (req, res) => {
	res.send('pong')
})

//Log-in page
app.get('/', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('index')
	}
})

//register page
app.get('/register', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('register')
	}	
})


//if the user is logged in show their profile
app.get('/profile', (req, res) => {
	if(req.session.email) {
		res.render('profile', {
			userName: req.session.username
		})
	}
	else {
		res.redirect('/')
	}
})

//adds new user to the database
app.post('/create', (req, res) => {
	if (req.body.username && req.body.email && req.body.password !== 0) {
		User.create({
			username: 	req.body.username,
			email: 		req.body.email, 
			password: 	req.body.password
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
	}).then( (user) => {
		if(user !== null && req.body.password === user.password) {
			req.session.email 		= req.body.email
			req.session.username 	= user.username
			console.log('succesfully logged in')
			res.redirect('/profile')
		} else {
			console.log('wrong log-in credentials')
			res.redirect('/')
		}
	})
})

//The users logs out
app.get('/logout', (req, res) => {
	req.session.destroy( (err) => {
		if(err) console.log(err)
			else { 
				res.redirect('/')
			}
	})
})

app.get('/create-post', (req, res) => {
	if(req.session.email) {
		res.render('create-post')

	}
	else {
		res.redirect('/')
	}
})

app.post('/upload-post', (req, res) => {
	if(req.session.email) {
		if(req.body.message.length !== 0) {
			User.findOne({
				where: {
					email: req.session.email
				}
			}).then( (user) => {
				user.createMessage({
					note: req.body.message
				})
			}).then( ( ) => {
				db.sync().then( () => {
					console.log('Message added to the db')
					res.redirect('profile')
				})
			})	
		}		
	}
	else {
		res.redirect('/')
	}
})

//select all messages for logged in user from db.
//store them in a var > pass to pug
//loop over them in the pug file.
app.get('/my-posts', (req, res) => {
	if(req.session.email) {
		User.findOne({
			where:{
				email: req.session.email
			}
		}).then(user => {
			Message.findAll({
				attributes: ['note'],
				where: {
					userId: user.id
				},
				include: [{
					model: User,
					attributes: ['username']
				}]				
			}).then (result => {
				res.render('myposts', {data: result})
				//console.log(result[0].user.username)
			})
		}) 
	}
	else {
		res.redirect('/')
	}	
})

app.get('/all-posts', (req, res) => {
	if(req.session.email) {
		Message.findAll({
			include: [{
				model: User,
				attributes: ['username']
			}]
		}).then(result => {
			res.render('all-posts', {data: result})
			for (var i = result.length - 1; i >= 0; i--) {
				console.log(result[i].user.username)
			}
		})
	}
	else {
		res.redirect('/')
	}
})

//Start the web-server on port 8000
app.listen(8000, () => {
	console.log('Yaay, web-server is running!')
})