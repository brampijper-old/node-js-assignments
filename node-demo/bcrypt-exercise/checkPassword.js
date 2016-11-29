const fs = require ('fs')
const bcrypt = require ('bcrypt-nodejs')

function checkPassword(input) {
	fs.readFile(__dirname + '/password.txt', (err, data) => {
 		bcrypt.compare(data, null, function(err, res) {
	 		if(res) {
	 			console.log('yes')
	 		}
	 		else {
	 			console.log(res)
	 		}	
 		})
 	})
}

checkPassword(process.argv[2])