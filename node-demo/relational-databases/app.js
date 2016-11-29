const sequelize = require ('sequelize')
const express = require ('express')
const app = express ()

let db = new sequelize('hats', 'postgres', 'postgres', {
	server: 'localhost',
	dialect: 'postgres'
})

let User = db.define('user', {
	name: sequelize.STRING,
	email: {type: sequelize.STRING, unique: true}
})

//Define database structure

//Define models
let Hat = db.define('hat', {
	name: sequelize.STRING,
	brim: sequelize.BOOLEAN,
	height: sequelize.INTEGER,
	material: sequelize.STRING
})

//Define relations
User.hasMany(Hat)
Hat.belongsTo(User)

//testing if the web-server is running
app.get('/ping', (req, res) => {
	res.send('pong')
})

//retrieve all hats
app.get('/hats', (req, res) => {
	Hat.findAll( {
		include: [ {
			model: User,
			attributes: ['name']
		}]
	} ).then(hats => {
		res.send(hats)
	})
})

app.get('/users', (req, res) => {
	User.findAll( {
		attributes: ['name'],
		include:[Hat]
	}).then (users => {
		res.send(users)
	})
})

//syncing with the db
db.sync({force:true}).then(db => {
	console.log('Synced Yay')
	
	User.create({
		name: 'Bram',
		email: 'brampijper@gmail.com'
	}).then(user=> {
		user.createHat({
			name: 'Bramhat',
			brim: false,
			height: 8,
			material: 'concrete'
		})
		user.createHat({
			name: 'Foolshat',
			brim: true,
			height: 1,
			material: 'dust'
		})		
	})
	
	User.create({
		name: 'Heiko',
		email: 'heiko@gmail.com'
	}).then(user=> {
		user.createHat({
			name: 'Random Hat',
			brim: false,
			height: 3,
			material: 'Feathers'
		})
		user.createHat({
			name: 'Shiny Hat',
			brim: true,
			height: 4,
			material: 'Rainbow'
		})		
	})

	Hat.create({
		name: 'Tophat',
		brim: true,
		height: 5,
		material: 'felt'
	})

	Hat.create({
		name: 'Fancyhat',
		brim: false,
		height: 1,
		material: 'rubber'
	})
})

//starting the web-server
app.listen(8000, ( ) => {
	console.log('server running')
})