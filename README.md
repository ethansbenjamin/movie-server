Models

Endpoints

GET /movies – Allows searching for movies in the database. Returns an array of movies that match the query constraints. Must support at least the following query parameters:

a. title – A string that should be considered a match for any movie that has a title containing the given string title (character case should be ignored). If no value is given for this parameter, all movies should match the title constraint.

b. genre – A string that should be considered a match if the movie’s list of genre keywords contains the given keyword. If no value is given for this parameter, all movies should match the genre constraint.

c. year – A number that should be considered a match if the movie’s release year matches. If no value is given for this parameter, all movies should match the year constraint.

d. minrating – A number that should be considered a match if the movie’s overall average review rating on your site is greater than or equal to the given value. If a movie does not have any reviews, the number value of its rating should be considered 0.

2. GET /movies/:movie – Allows retrieving information about a specific movie with the unique ID movie, assuming it is a valid ID. The returned JSON should contain the basic movie information (title, year, actors, etc.) and also information about the reviews of the movie.

3. POST /movies – Allows a new movie to be added into the database. It will accept a JSON representation of a movie and is responsible for checking the

4 COMP 2406 – Fall 2020

Movie Database Project

data is valid before adding it to the database. Your documentation should specify the required data and expected format. If a person is specified as a writer/director/actor within the movie but does not currently exist in the database, a new person should be created and added to the database.

4. GET /people – Allows searching for people within the movie database. At minimum, this must support an optional name query parameter. If the query parameter is included, it should return any person in the database whose name contains the given name parameter. The search should also be done in a case-insensitive nature. If no parameter is given, all people should match the query.

5. GET /people/:person – Retrieves the person with the given unique ID, if they exist. This should include, at minimum, the name of the person and the movies they have been a part of.

6. GET /users – Allows searching the users of the application. At minimum, this must support an optional name query parameter. If the query parameter is included, it should return any user in the database whose name contains the given name parameter. The search should also be done in a case-insensitive nature. If the parameter is not specified, any user should match the search constraint.

7. GET /users/:user – Get information about the user with the given unique ID, if they exist. This should contain their username, their account status (regular user or contributing user) and the reviews the user has made.