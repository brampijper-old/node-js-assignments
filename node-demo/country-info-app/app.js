var helper = require(__dirname + '/helper.js')
var filepath = __dirname + '/json/countries.json' 

var countryName = process.argv[2]

helper(filepath, function (parsedFile) {
	for(var i = 0; i < parsedFile.length; i++ ) {
		if (parsedFile[i].name == countryName) {
			console.log('Country: ' + countryName)
			console.log('TopLevelDomain: ' + parsedFile[i].topLevelDomain)
		}
	}
})





