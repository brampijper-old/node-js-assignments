const express 	= require ('express')
const app		= express ( )

let pingRouter = require ( __dirname + '/routes/ping' )
let duckRouter = require ( __dirname + '/routes/ducky' )

app.use('/', pingRouter)

app.use('/animals', duckRouter)


//start webserver
app.listen( 8000, ( ) => {
	console.log('Yay server running')
})