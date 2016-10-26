$(document).ready(() => {

    $("input").keyup(() => {
    	let input = $('#inputContent').val()
    	
    	$.post('/potato', {input: input}, (data, status) => {
    		$('#users').empty()
    		 for (var i = 0; i < data.length; i++) {
    		 	$('#users').append('<option>' + data[i] + '</option>')
    		 }
    	})
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