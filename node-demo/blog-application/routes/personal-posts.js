const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/database')

//Only displays the messages that the logged-in user created.
router.get('/my-posts', (req, res) => {
	if(req.session.email) {
		db.user.findOne({
			where:{
				email: req.session.email
			}
		}).then(user => {
			db.message.findAll({
				attributes: ['note'],
				where: {
					userId: user.id
				},
				include: [{
					model: db.user,
					attributes: ['username']
				}]				
			}).then (result => {
				res.render('myposts', {data: result})
			})
		}) 
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in'))
	}	
})

module.exports = router
