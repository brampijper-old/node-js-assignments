$(document).ready(function() {
	if(!Cookies.get('visited') ) {
		$('#container').html('<h1>Welcome</h1>')
		Cookies.set('visited', 'true')
	} else {
		$('#container').html('<h1>Welcome Back!!!</h1>')
	}
})