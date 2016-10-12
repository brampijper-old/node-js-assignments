var fs = require('fs');

fs.readdir('./', function(error, files) {
	if(error) {
		throw error; 
	}
	console.log(files);

	for (i = 0; i < files.length; i++) {

		fs.readFile(files[i], 'utf8', function(err, data) { 
			if (err) {
				console.log(err);
				throw err;
			}
			console.log(data); 
		})  
	}
})