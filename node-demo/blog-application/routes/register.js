const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/database')
db.conn.sync()

router.get('/register', (req, res) => {
	if(req.session.email) {
		res.redirect('/profile')
	}
	else {
		res.render('register')
	}	

})

router.post('/register', (req, res) => {
	if (req.body.username && req.body.email && req.body.password !== 0) {
			bcrypt.hash(req.body.password, null, null, function(err, hash) {
				db.user.create({
					username: req.body.username,
					email: req.body.email,
					password: hash
				}).then(function () {
					console.log('User Added')
					res.redirect('/login?message' + encodeURIComponent("Please log-in"))
				})
			})
	} 
})

module.exports = router