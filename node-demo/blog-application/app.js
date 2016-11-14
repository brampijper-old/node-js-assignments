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
	cookie: {maxAge: 365 * 24 * 60 * 60 * 1000},
	resave: true,
	saveUninitialized: false
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
		res.render('index', {
			message: req.query.message
		})
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
		res.redirect('/?message' + encodeURIComponent("Please log-in"))
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
				res.redirect('/?message' + encodeURIComponent("Please log-in"))
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
			res.redirect('/?message=' + encodeURIComponent('Invalid email or password.'))
		}
	})
})

//The users logs out
app.get('/logout', (req, res) => {
	req.session.destroy( (err) => {
		if(err) console.log(err)
			else { 
				res.redirect('/?message=' + encodeURIComponent('Successfully logged out.'))
			}
	})
})

//displays the create post page
app.get('/create-post', (req, res) => {
	if(req.session.email) {
		res.render('create-post')

	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in'))
	}
})

//stores the the message in the db
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

//Only displays the messages that the logged-in user created.
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
			})
		}) 
	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in'))
	}	
})

//Displays all the messages including the user names. 
app.get('/all-posts', (req, res) => {
	if(req.session.email) {
		Message.findAll({
			include: [{
				model: User,
				attributes: ['username']
			}]
		}).then(result => {
			res.render('all-posts', {data: result})
		})
	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in'))
	}
})

app.post('/view', (req, res) => {
	if(req.session.email) {
		
		res.redirect('selected-post?id')
	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in'))
	}
})

app.get('/selected-post', (req, res) => {
	if(req.session.email) {
		Message.findAll({
			where: {
				id: req.query.id 
			},
			include: [{
				model: User,
				attributes: ['username']
			}]
		}).then(result => {
			res.render('selected-post', {data: result})
		})
	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in again'))
	}
})

app.post('/comment', (req, res) => {
	if(req.session.email) {
		console.log('yesshhh')
		if(req.body.comment.length !== 0) {
			User.findOne ({
				where: {
					email: req.session.email
				}
			}).then(user => {
				user.createComment({
					opnion: req.body.comment
				})
			}).then( () => {
				db.sync().then( () => {
					res.redirect('selected-post')
					//link + the message id -> so it returns to the same page. 
				})
			})

			// User.findOne({
			// 	where: {
			// 		email: req.session.email
			// 	}
			// }).then(user => {
			// 	user.createComment({
			// 		opinion: req.body.comment
			// 		//commentId: message.id 
			// 		//link the message id with the comment id, cause a message could have many comments. 
			// 		//How do I give the current message id to the comment ID?
			// 	})
			//})
		}
	}
	else {
		res.redirect('/?message' + encodeURIComponent('Please log-in'))
	}
})

// db.sync({force: true}).then( () => {
// 	User.create({
// 		username: 'Cat',
// 		email: 'cat@miauw.com',
// 		password: 'pur' 
// 	}).then( (user) => {
// 		Message.create({
// 			note: 'This blogging app works like crazy shit'
// 		}).then( (message) => {
// 			opinion: 'No, this is amazing'
// 		})
// 	})
// })

//Start the web-server on port 8000
app.listen(8000, () => {
	console.log('Yaay, web-server is running!')
})


//npm bcript -node.js 