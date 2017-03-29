angular.module('omdb.movies').controller('movieDetailsCtrl', function($rootScope, $scope, $compile, $http, $state, data){
    $scope.movieDetails = data.details;

    $scope.websiteURL = function(){
        var url = data.details.Website;

        //If there's no website available don't show label.
        if(url === "N/A"){
            url = false;
        }

        return url;
    }

    $scope.posterURL = function(){
        var url = data.details.Poster;

        //If there's no poster url use a default image.
        if(url === "N/A"){
            url = 'styles/img/no_image_available.png';
        }
        
        return url;
    };

    $scope.backToMovies = function(){
        $state.go('app.omdb.movies');
    };
});