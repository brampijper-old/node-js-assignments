// var greeter = function(tag) {
// 	console.log(tag)
// }

function helloWorld() {
	console.log('Hello World')
}

var invisible = function() {
	console.log("can't touch this")
}

//module.exports = helloWorld

module.exports = {
	sayHello: helloWorld, // you can name them anything 
	notSeen: invisible
}