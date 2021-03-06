#Installation Instructions

Dante Garcia                                                    3/29/2017
dantegrc@gmail.com

-Run all the following commands from your terminal inside the src folder.
-Execute npm install inside the src folder 'npm install'
-Followed by 'bower install'

To run the website run the command 'npm run dev'
The URL should point to http://localhost:8891. 
You may change the port number from inside the gulp file.

NOTE: Must have NodeJS installed. All the dependencies will be resolved, but angularjs should be at version 1.4.14.
If the installation process fails you may host the 'build' folder on any web server.


# OMDb-Search
Search the OMDb API

## OMDb API Examples
Please note that the OMDb API does not require any form of authentication. See the [OMDb API documentation](http://www.omdbapi.com/#parameters) for all supported parameters.

### Search by query

```
http://www.omdbapi.com/?s=ghost //results 1-10
http://www.omdbapi.com/?s=ghost&page=2 //  results 11-20
```
- Returns the first 10 results based on the query value provided as `s`
- Pagination can be added via `&page=n`, where `n` is 1-100

#### Movie Object Structure
```json
{
    "Title": "Mission: Impossible - Ghost Protocol",
    "Year": "2011",
    "imdbID": "tt1229238",
    "Type": "movie",
    "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SX300.jpg"
}
```

### View movie details by `imdbID`
```
http://www.omdbapi.com/?i=tt1229238
```
- Using the `imdbID` provided by the search results will let you fetch the details of a particular movie.
