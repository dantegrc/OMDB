angular.module('Shared.Directives').directive('datatableServerSide', function ($rootScope, $compile, $filter) {
	return {
		restrict: 'A',
		scope: {
			tableOptions: '='
		},
		link: function (scope, element, attr) {

			/* // DOM Position key index //

			 l - Length changing (dropdown)
			 f - Filtering input (search)
			 t - The Table! (datatable)
			 i - Information (records)
			 p - Pagination (paging)
			 r - Processing
			 < and > - div elements
			 <"#id" and > - div with an id
			 <"class" and > - div with a class
			 <"#id.class" and > - div with an id and class

			 Also see: http://legacy.datatables.net/usage/features
			 */

			var locale = ''

			var options = {
				autoWidth: false,
				serverSide: true,
				stateSave: true,
				bLengthChange: false,
				filter: true,
				"oLanguage": {
					"sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
					"sEmptyTable": "Please make a search entry to begin..."
				},

				"smartResponsiveHelper": null,
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
				"t" +
				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"fnPreDrawCallback": function () {
					// Initialize the responsive datatables helper once.
					if (!this.smartResponsiveHelper) {
						this.smartResponsiveHelper = new ResponsiveDatatablesHelper(element, {
							tablet: 1024,
							phone: 480
						});
					}
				},

				"fnRowCallback": function (nRow) {
					this.smartResponsiveHelper.createExpandIcon(nRow);
				},

				"fnDrawCallback": function (oSettings) {
					this.smartResponsiveHelper.respond();
				},

				"footerCallback": function (row, data, start, end, display) {
					var createDivId = "#" + attr.id + "_info";
					var footerSection = angular.element(createDivId);
					//footerSection[0].outerText;
					setTimeout(function () {

						//This is only a quick fix to release 8/19/2015
						var getText = footerSection[0].textContent;
						var shortenText = getText.split('(');
						footerSection[0].textContent = shortenText[0];

					}, 1);

				},
			};

			if (attr.tableOptions) {
				options = angular.extend(options, scope.tableOptions)
			}
			var _dataTable = element.DataTable(options);
		}
	}
})