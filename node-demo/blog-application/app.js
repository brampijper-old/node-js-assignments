//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const app 			= express()

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

let registerRouter		= require (__dirname + '/routes/register')
let loginRouter			= require (__dirname + '/routes/login')
let profileRouter		= require (__dirname + '/routes/profile')
let createpostRouter	= require (__dirname + '/routes/create-post')
let personalpostsRouter	= require (__dirname + '/routes/personal-posts')
let allpostsRouter		= require (__dirname + '/routes/all-posts')
let logoutRouter		= require (__dirname + '/routes/logout')

app.use('/', registerRouter)
app.use('/', loginRouter)
app.use('/', profileRouter)
app.use('/', createpostRouter)
app.use('/', personalpostsRouter)
app.use('/', allpostsRouter)
app.use('/', logoutRouter)

//Start the web-server on port 8000
app.listen(8080, () => {
	console.log('Yaay, web-server is running!')
})