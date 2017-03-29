angular.module('omdb.movies').controller('moviesCtrl', function ($rootScope, $scope, $state, $compile, datatableApiCall) {

    //console.log('IN movies controller');

    var dtCall = datatableApiCall;
    $scope.options = {
        stateSave: true,
        oLanguage: {
            "sSearchPlaceholder": "Search movie...",
            "sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
            "sEmptyTable": "Please make a search entry to begin..."
        },
        fnCreatedRow: function (nRow) {
            $compile(angular.element(nRow))($scope);
        },
        stateSaveParams: function (oSettings, oData) {
        },
        fnHeaderCallback: function (nHead) {

            $compile(angular.element(nHead))($scope);

        },
        fnServerData: function (sSource, aoData, fnCallback, oSettings) {

            var newParameters = [];

            //Rename search filter name.
            _.forEach(aoData, function (value, index) {
                if (value.name === 'search') {
                    newParameters.push({
                        'name': 's',
                        'value': value.value.value
                    })
                }
            });

            dtCall.initiateContact('', sSource, aoData, fnCallback, oSettings, newParameters);
        },
        columns: [
            // Poster
            {
                "orderable": false,
                "mRender": function (data, type, full) {

                    var image = full.Poster == "N/A" ?
                        `<a ui-sref="app.omdb.movies.details({'imdbId':'${full.imdbID}'})"> <img src="styles/img/no_image_available.png" style="width:75px;height:100px;"></a>` :
                        `<a ui-sref="app.omdb.movies.details({'imdbId':'${full.imdbID}'})"> <img src="${full.Poster}" style="width:75px;height:100px;"></a>`;

                    return image;
                }
            },
            // Title
            {
                "orderable": false,
                "mRender": function (data, type, full) {
                    return `<a ui-sref="app.omdb.movies.details({'imdbId':'${full.imdbID}'})">${full.Title}</a>`;
                }

            },
            // Year
            {
                "mData": "Year",
                "orderable": false
            },
            // imdbID
            {
                "mData": "imdbID",
                "orderable": false
            },
            // Type
            {
                "mData": "Type",
                "orderable": false
            }
        ]
    };

    $scope.viewDetails = function (imdbID) {
        $state.transitionTo('app.omdb.movies-details', { "imdbID": imdbID });
    };

});