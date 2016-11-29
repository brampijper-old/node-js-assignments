const request = require ('supertest')
const expect = require ('chai').expect

// Import the server from app.js
let server = require(__dirname + '/../app.js')

//Run app in testing environment
let app = request(server)

// Test wheter the server works
describe('Testing wether the server works', f => {
	// Check if the server is online
	describe('Check if GET / is online', f => {
		it('Returns a 200 status code', done => {
			app.get('/')
			.end( (err, res) => {
				expect(res.statusCode).to.equal(200)
				console.log(res.body)
				done( )
			})
		})
	})
})