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

app.post ('/add', (req, res, inputName) => {
	inputName = req.body.firstName
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			let parsedData = JSON.parse(data)
			for(var key in parsedData) {
				if(parsedData[key].firstName == inputName || parsedData[key].lastName == inputName) {
					res.render(__dirname + '/views/result.pug', {result: parsedData[key]})
				} 
			}
	})
})

app.get('/addUser', (req, res) => {
	res.render('addUser')
})

app.post('/addUser', (req,res) => {

	fs.readFile(__dirname + '/users.json', (error, data) => {
		if(error) throw error
			parsedData = JSON.parse(data)
			parsedData.push({firstName: req.body.firstName, lastName: req.body.lastName, emailadres: req.body.emailadres})
			json = JSON.stringify(parsedData)

			fs.writeFile(__dirname + '/users.json', json, 'utf8', (error, data) => {
				if(error) throw error
					let test = JSON.parse(json)
					res.render(__dirname + '/views/index.pug', {data: test})
			})
	})
})


app.listen(8000, () => {
	console.log('Server running')
})


