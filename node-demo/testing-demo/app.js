const express = require ('express')
const app = express()

app.get ('/', ( req, res ) => {
	res.send( 'I work!') 
})

app.listen(8000, app => {
	console.log('Server running')
})

module.exports = app