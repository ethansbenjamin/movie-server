This is the code for my express server. 
I have stored all the movie data from the large JSON file into MongoDB. 
The express server queries data from the DB and serves JSON outputs.

to install, please run npm install in the /backend directory. 
to run the server, run npm start: this will execute nodemon app.js
please create a dotenv file and paste this variable in there
DB_CONNECTION=mongodb+srv://admin:Jg5NIAOsNmfISdqR@cluster.sziyr.mongodb.net/cluster?retryWrites=true&w=majority
or -> hardcode this connection string into app.js

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


http://localhost:8080/movies/?Director=Christopher+Nolan would return all Christopher Nolan Movies in the Database
http://localhost:8080/movies/?Director=Christopher+Nolan&Year=2010 would return all Christopher Nolan Movies in 2010 (inception)
http://localhost:8080/movies/?Title=Interstellar would return Interstellar


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


after that, make a get request with the same url and see the new data

I used the mongoimport tool to get the movies.json file into the movie cluster of my mongodb instance. I have stored the variables needed
in the dotenv so the configurations there should allow for access to the backend. 

The person and user models have been defined in my ./models folder, however I have not yet defined routes for them.

