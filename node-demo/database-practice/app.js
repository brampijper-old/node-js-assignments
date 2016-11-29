const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const db = new Sequelize('ormdemo', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

let Hat = db.define('hat', {
	name: Sequelize.STRING,
	material: Sequelize.STRING,
	height: Sequelize.INTEGER,
	brim: Sequelize.BOOLEAN
})

db.sync({force:true} ).then( ( ) => {
	console.log('Database synced succesfully')
	
	Promise.all([Hat.create( {
		name: "The Primary Hat",
		material: "Stardust",
		height: 42,
		brim: true
	}),
	Hat.create( {
		name: "The Secondary Hat",
		material: "Moondust",
		height: 10,
		brim: false
	})
	]).then (hat => {
	Hat.findAll( {
		where: {
			name: 'The Secondary Hat'
		}
	})		
	})
})

app.get('/hats', (req, res) => {
	Hat.findAll().then(hats => {
		res.send(hats)
	})
})

//Start webserver on port 8000
app.listen(8000, () => {
	console.log('Yaay, server running')
})












