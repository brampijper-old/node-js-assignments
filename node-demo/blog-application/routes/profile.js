const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

router.get('/profile', (req, res) => {
	if(req.session.email) {
		res.render('profile', {
			userName: req.session.username
		})
	}
	else {
		res.redirect('/login?message=' + encodeURIComponent('Please log-in first;)'))
	}
})

module.exports = router