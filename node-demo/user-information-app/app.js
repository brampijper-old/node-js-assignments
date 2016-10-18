const express = require ('express')
const fs = require ('fs')
const app = express()
const bodyParser = require ('body-parser')

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(bodyParser())

app.get('/users', (req, res) => {
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			res.render('index', {data: parsedData})
	})
})

app.get('/form', (req, res) => {
	res.render('form')
})

app.post ('/', (req, res) => {
	let inputName = req.body.firstName
	
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			for(var key in parsedData) {
				if(parsedData[key].firstName || parsedData[key].lastName == inputName) {
					res.render('result', {result: parsedData[key].firstName + parsedData[key].lastname + parsedData[key].emailadres})
					console.log('Yaaaay we got a match')
				}
			}
	})
})

app.listen(8000, () => {
	console.log('Server running')
})

//takes in the post request from your form
//displays matching users on a new page

//I have to compare the firstname variable with the content of the JSON file.   

