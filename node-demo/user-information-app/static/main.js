$(document).ready(() => {

	lastTime = Date.now() - 300

	$("input").keyup( function() {

		console.log(lastTime)

		if(Date.now() - lastTime >= 300) {
			console.log("yaaay")
			test()
			lastTime = Date.now()
		}

		function test() {
			let input = $('#inputContent').val()
			$.post('/potato', {input: input}, function (data, status) {
				$('#users').empty()
		 			for (var i = 0; i < data.length; i++) {
		 				$('#users').append('<option>' + data[i] + '</option>')
		 			}
			})
		}
    });
});




// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// let fruitArray = ['apple', 'orange', 'pineapple']

// function checkArray(fruit) {
// 	var a = fruitArray.indexOf(fruit); 
// 	console.log(a)
// }

// checkArray()

// let fruitArray = ['apple', 'orange', 'orange', 'pineapple']

// function checkArray(fruit) {
// 	var a = []

// 	for(i = 0; i < frutitArray.lengh; i++) {
// 		if (fruitArray[i] == fruit) {
// 			console.log(i)
// 		}
// 	}
// 	// console.log(a)
// }

// checkArray('orange')

//JSON file is a file with an array of objects. 





//A little set time-out function in Javascript

//		time = Date.now()
// 		newTime = time + 300
	
// 	function myLittleFunction(time, newTime) {
		
// 		time = Date.now()
// 		newTime = time + 300
// 		// console.log('yaaay I run now')
// 		// console.log(time)
// 		// console.log(newTime)
// 		let canIRun = false

// 		for(time; time <= newTime; time++) {
// 			if(time == newTime) {
// 				console.log('yaaaay')
// 				canIrun = true
				
// 				time = Date.now()
// 				newTime = time + 300
// 				myLittleFunction(time, newTime)
// 		}
// 		else if(time !== newTime) {
// 			console.log('noooooo')
// 			canIrun = false
// 		}
// 	}

// 	// if(canIRun == true) {
// 	// 	console.log(canIRun)
// 	// 	myLittleFunction()
// 	// 	//run the code
// 	// }
// 	// if(canIRun == false) {
// 	// 	console.log(canIRun)
// 	// 	//block the code
// 	// }
// }

// myLittleFunction(time,newTime)
// // setInterval(myLittleFunction(time, newTime), 300)

