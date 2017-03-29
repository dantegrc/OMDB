angular.module('omdb', [
    'ui.router',
    'omdb.movies'
]);

angular.module('omdb').config(function ($stateProvider) {
    var stateDef = 'app.omdb';
    $stateProvider.state(stateDef, {
        abstrac: true,
        resolve  : {
                scripts: function(lazyScript){
                    return lazyScript.register([
                        'build/vendor.datatables.js',
                        'build/vendor.ui.js'
                    ]);
                }
            },
        data: {
            title: 'OMDb'
        }
    });
});