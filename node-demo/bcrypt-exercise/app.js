const fs = require ('fs')
const bcrypt = require ('bcrypt-nodejs')

function input (text) {
	bcrypt.hash(text, null, null, function(err, hash) {
		if(err) {
			console.log(err)
		}
		else {
			fs.writeFile(__dirname + '/password.txt', hash, function(err) {
				console.log('password added')
			})			
		}
	})
}

input( process.argv[2] )