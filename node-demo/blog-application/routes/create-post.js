const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/database')

//displays the create post page
router.get('/create-post', (req, res) => {
	if(req.session.email) {
		res.render('create-post')
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in'))
	}
})

//stores the the message in the db
router.post('/create-post', (req, res) => {
	if(req.session.email) {
		if(req.body.message.length !== 0) {
			db.user.findOne({
				where: {
					email: req.session.email
				}
			}).then( (user) => {
				user.createMessage({
					note: req.body.message
				})
			}).then( ( ) => {
				db.conn.sync().then( () => {
					res.redirect('/profile')
				})
			})	
		}		
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in'))
	}
})

module.exports = router
