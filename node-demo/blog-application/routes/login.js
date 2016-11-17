const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/database')

router.get('/login', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('index', {
			message: req.query.message
		})
	}
})

router.post('/login', (req, res) => {
	db.user.findOne({
		where: {
			email: req.body.email
		}
	}).then( (user) => {
		bcrypt.compare(req.body.password, user.password, function(err, result) {
			if(result) {
				req.session.email 		= req.body.email
				req.session.username 	= user.username
				console.log('succesfully logged in')
				res.redirect('/profile')
			} else {
				res.redirect('/login?message=' + encodeURIComponent('Invalid email or password.'))
			}
		})
	})
})

module.exports = router