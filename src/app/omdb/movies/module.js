angular.module('omdb.movies', [
    'ui.router'
]).config(function ($stateProvider) {
    var stateDef = 'app.omdb.movies';
    $stateProvider.state(stateDef, {
        url: '/movies',
        views: {
            'content@app': {
                controller: 'moviesCtrl',
                templateUrl: 'app/omdb/movies/views/index.html'
            }
        },

        data: {
            title: 'Movies'
        }
    }).state('app.omdb.movies.details', {
        url: '/movie-details/:imdbId',
        views: {
            'content@app': {
                controller: 'movieDetailsCtrl',
                templateUrl: 'app/omdb/movies/views/details.html'
            },

        },
        resolve: {
            data: function ($http, $q, $stateParams) {

                var movieDetails = $http.get('http://www.omdbapi.com/?i=' + $stateParams.imdbId);

                return $q.all([movieDetails]).then(function (response) {

                    var data = {
                        details: response[0].data
                    };

                    return data;
                });
            }
        },

        data: {
            title: 'Movie Details',
            imdbId: null

        }
    });
});