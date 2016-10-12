var fs = require('fs');

var readCountries = function (filename, callback) {
	fs.readFile (filename, 'utf8', function(err, file) {
		if(err) {
			console.log(err)
			throw err
		}
		var parsedFile = JSON.parse(file)
		callback(parsedFile) 
	})
}
module.exports = readCountries