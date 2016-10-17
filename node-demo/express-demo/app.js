const express = require ('express')
const app = express()

app.get ('/', (request, respons) => {
	respons.status(418)
	respons.send ('Hello Bram, it is so good to see you in the browser')
} )

app.listen(8000, () => {
	console.log('I am listening')
})