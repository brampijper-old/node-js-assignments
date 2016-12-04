const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const cookieParser 	= require ('cookie-parser')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

//connecting string to the database.
let db = new sequelize ('blog_application', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

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

db.sync({force: true}).then( () => {
	User.create({
		username: 'Cat',
		email: 'cat@miauw.com',
		password: 'pur' 
	}).then( (user) => {
		user.createMessage({
			note: 'This blogging app works like crazy shit'
		}).then( (user) => {
			user.createComment({
				opinion: 'No, this is amaaaaazing',
				userId: '1'
			})
		}).then( () => {
			Message.findOne({
				where: {
					id: '2'
				}
			}).then( (message) => {
				message.createComment({
					opinion: 'No, I just want sleep duhh',
					userId: '2',
					include: [{
						model: User,
						username: 'Lion-Man'
					}]
				})
			} )
		})
	})
}).then( ( ) => {
		User.create({
		username: 'Lion-Man',
		email: 'lion@roar.com',
		password: 'roar' 
	}).then( (user) => {
		user.createMessage({
			note: 'I want to jump around in the nature'
		})
		// .then( (message) => {
		// 	message.createComment({
		// 		opinion: 'I hate you cat',
		// 		userId: '2'
		// 	})
		// }).then( () => {
		// 	Message.findOne({
		// 		where: {
		// 			id: '1'
		// 		}
		// 	}).then( (message) => {
		// 		message.createComment({
		// 			opinion: 'This is going to work perfectly',
		// 			userId: '2'
		// 		})
		// 	})
		// })
	})
})

//export defined modules
module.exports = {
	conn: db,
	user: User,
	message: Message,
	comment: Comment
}