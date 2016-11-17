//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/database')

router.get('/all-posts', (req, res) => {
	if(req.session.email) {
		db.message.findAll({
			include: [{
				model: db.user,
				attributes: ['username']
			}]
		}).then(result => {
			res.render('all-posts', {data: result})
		})
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in'))
	}
})

router.get('/selected-post', (req, res) => {
	if(req.session.email) {
		db.message.findAll({
			where: {
				id: req.query.id 
			},
			include: 
				[{model: db.user}, 
			{ model: db.comment,
			include: [db.user]
		}]
		}).then(message => {
			console.log(message)
			res.render('selected-post', {data: message})
		})
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in again'))
	}
})

router.post('/comment', (req, res) => {
	if(req.session.email) {
		if(req.body.comment.length !== 0) {
			db.user.findOne ({
				where: {
					email: req.session.email
				} 
			}).then(user => {
				user.createComment({
					opinion: req.body.comment,
					messageId: req.query.id
				})
			}).then( () => {
					res.redirect('/selected-post?id=' + req.query.id) 
				}) 
		}
	}
	else {
		res.redirect('/login?message' + encodeURIComponent('Please log-in'))
	}
})

module.exports = router