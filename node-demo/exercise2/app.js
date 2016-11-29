const express = require ('express')
const app = express()

app.use('/', express.static(__dirname + '/views'))

app.listen(8000, () => {
	console.log('Server is running')
})

