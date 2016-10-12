var fs = require('fs');

var readCountries = function (typedCountry) {
	fs.readFile (__dirname + '/json/countries.json', function(err, file) {
		if(err) {
			console.log(err)
			throw err
		}

		var parsedFile = JSON.parse(file);
		for(var i = 0; i < parsedFile.length; i++ ) {
			data = parsedFile[i]
			if (data.name == typedCountry) {
				console.log('Country: ' + typedCountry)
				console.log('TopLevelDomain: ' + data.topLevelDomain)
			}
		}
	})
}
module.exports = readCountries