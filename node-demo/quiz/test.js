let fruits = ['apple', 'orange', 'pineapple']

function indexFinder (typedFruit) {
	for (i=0; i < fruits.length; i++) {
		console.log(fruits[i])
		
		if(fruits[i] == typedFruit) {
			return i
		} 
		
		else {
			return '-1'
		}
	}
} 

indexFinder('orange')