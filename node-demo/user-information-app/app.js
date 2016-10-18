const express = require ('express')
const fs = require ('fs')
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/index', (req, res) => {
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			res.render('index', {data: parsedData})
	})
})

app.listen(8000, () => {
	console.log('Server running')
})

