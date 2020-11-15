This is the code for my REST JSON API.
The server queries data from the DB and serves JSON outputs.

to install, please run npm install
to run the server, run npm start: this will execute nodemon server.js


Sign Up and Login:

For authentication, this server uses JWT tokens. To signup for an account make a JSON body with a username, email, and password. 
/api/auth/signup
after signing up for an account you can sign in. you will then receive an access token to put in the header of postman.
The key should be x-access-token, and the value is the token itself. 
/api/auth/signin
this route takes the username and password, and then returns the user's credentials. 
{
"username":"ethansb",
"password":"password1"
}

{
  "username":"moderator",
  "password":"password1"
}
{
  "username":"admin",
  "password":"password1:
}
The auth was inspired by this tutorial: https://bezkoder.com/node-js-mongodb-auth-jwt/
I have 3 types of roles in the database: user, moderator (contributing user), and admin. 
There is middleware that checks each token for role type before sending responses. If a token does not have access to a certain resource then it will respond as invalid access. 






Movies:

for now, a general get request to movies will have a limit of 20 movies. 
http://localhost:8080/movies/ -> running get to this will show the first 20 movies in the database

5f921080cb2c36567df8d1c2 -> Inception
5f92107ccb2c36567df8b42c -> Jumanji


http://localhost:8080/movies/5f921080cb2c36567df8d1c2 would return a json file with Inception(2010) data

we can add any optional fields with query parameters.
?Title=
?Year=
?Rated=
?Director=
?Language=


to delete a movie provide the valid movie id and make a delete request with the movie id

{
    "Ratings": [],
    "_id": "5f93a344b5f6f3933d17f831",
    "Title": "Who Killed Captain Alex?",
    "Runtime": "112 min",
    "Year": "2010",
    "Director": "Alex",
    "Genre": "Action",
    "Actors": "person1, 2, 3,4",
    "Plot": "this is a movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg",
    "__v": 0
}
i added this movie above with a post request, make delete request with this url: http://localhost:8080/movies/5f93a344b5f6f3933d17f831

We can also make a post request to the movies with the http://localhost:8080/movies/ link and posting in the body.
the required parameters for a movie to be valid are 
  Title:
  Plot: 
  Year: 
  Genre: 
  Director: 
  Actors: 
  Runtime: 
  Poster: 

try posting the same movie we deleted above:

{
"Title": "Who Killed Captain Alex?",
  "Plot": "this is a movie",
  "Year": "2010" ,
  "Genre": "Action",
  "Director": "Alex",
  "Actors": "person1, 2, 3,4",
  "Runtime": "112 min",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg"
}

to update movie data, provide the valid movie id and request body (json payload).

change the plot of the movie we just posted above. grab the id from that movie and send this new plot with a patch request to
the http://localhost:8080/movies/ adding the movie id.

{
    "Plot":"Uganda's Best Action movie. The finest work of the 2010s"
}


there is also the get /movies/search/:searchQuery route. I implemented MongoDB fuzzy searching, which searches the database for records that match the query string given after.
in the MongoDB atlas configuration, I made sure the search indexes were using title, year, genre, and plot. This was one of the more difficult parts to build

you can also post to the /movies/review/:movieId route, which takes a review and adds it to a movies reviews array. 
{
“review": "this movie is great",

“score": 8,

“username": "ethansb",

“title": "Great movie, would totally watch again."

}

There is also a Users routes,

With these routes, we can manipulate the users collection in the database. We can search users, get users by id, and post reviews to a users account. 
{
“review": "this movie is great",

“score": 8,

“username": "ethan",

“title": "Great movie, would totally watch again."
}
try posting that review to users/review/:userId with an access token! 

you can also post that review to a movie id with an access token!
try it with /movies/review/:movieId.
