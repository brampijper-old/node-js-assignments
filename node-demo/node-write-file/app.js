var fs = require('fs');

fs.writeFile ( __dirname + '/content.txt', 'SUPER CAT', function(mistake) {
	if(mistake) throw mistake
}) ;