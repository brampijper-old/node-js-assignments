Game Plan - Blog-Application 

Quick Tips
	1. localhost:8000/login
	2. Register
	3. Log-in
	4. Feel free to break the app :p 


	1. Set-up project.
		1.  Create directories
		2. npm init
		3. Install necessary libraries
			1. express / pg / sequelize / body-parser / pug / express-session

		4. Create app.js
		5. Create .gitignore and add node-modules to it 
		6. Require all the libraries in the app.js
		7. Start running the webserver at port 8000
		8. Test if the webserver is working with /ping. 
		9. Set the view engine to pug
			1. Set a default folder called static or recourses. 

		10. Test if everything works. 



	2. Set-up Database Structure
		1. Create first table - User
			1. username
			2. email
			3. password

		2. Create second table - Post
			1. message
			2. user-id

		3. Create third table - Comment
			1. comment
			2. user-id
			3. message-id

	2.1 Relations between tables
 		1. User has many Message & User has many Comment
		2. Message has many Comment & Message belongs To User
		3. Comment belongs to User & Comment belongs To Message



	3. Necessary Routes
		1. /login
			1. emailadress
			2. password

		2. /register
			1. Create a new account
				1. new username
				2. emailadress
				3. password

		3. /profile
			1. /create-post
				1. create a post.

			2. /view-own-posts
				1. view a list of their own posts.

			3. /show-all-posts
				1. view a list of everyone's posts.
			
			4. /specific-post
				1. View a specific post with all the comments

			5. /comment
				1. Make a comment on a specific post. 

			6. /logout
				1. Destroys the current session.




