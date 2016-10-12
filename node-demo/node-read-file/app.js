console.log('Initializing app');

var fs = require('fs');

fs.readFile('./movie.txt', 'utf8', function(err, data) { // => also means function // We want it to the utf8 char set. 
	if (err) {
		console.log(err); //short hand for writing one if statements -> console.log is not necessiary if there's a 'throw' error. 
		throw err;
	}
	console.log(data); 

})  