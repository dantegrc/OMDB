angular.module('Shared.Services').service('datatableApiCall', function ($rootScope) {
    return {
        initiateContact: function (api, sSource, aoData, fnCallback, oSettings, aoDataExt) {

            aoData = [];

            /*###############################################################################################
                                         For displaying the correct page number
            #################################################################################################*/
            var pgIndex = Math.round(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;

            if (aoDataExt && aoDataExt.length > 0) {
                _.forEach(aoDataExt, function (value) {
                    aoData.push(value);
                });
            }
            //Setting pagination
            aoData.push({
                "name": 'page',
                "value": pgIndex
            });

            oSettings.jqXHR = $.ajax({
                "type": "GET",
                "cache": false,
                "url": "http://www.omdbapi.com/",
                "data": aoData,
                beforeSend: function (xhr) {
                },
                success: function (json) {
                    try {
                        json.iTotalRecords = json.Search || 0;
                        json.iTotalDisplayRecords = json.totalResults || 0;
                        oSettings.json = json;

                        json.data = json.Search || [];

                        fnCallback(json);
                    }catch(e){
                        console.log(e);
                    }
                }
            });
        }
    }
});