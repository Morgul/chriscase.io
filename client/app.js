// ---------------------------------------------------------------------------------------------------------------------
// Main Angular Application.
//
// @module app.js
// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio', [
        'ngRoute',

        'lodash',
        'ui.bootstrap',

        'chriscaseio.services',
        'chriscaseio.controllers',
        'chriscaseio.directives',
        'chriscaseio.utils'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', { templateUrl: '/components/home/home.html', controller: 'HomeController' })
            .when('/admin', { templateUrl: '/components/admin/admin.html', controller: 'AdminController' })
            .otherwise({redirectTo: '/'});
    }]);

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.services', []);
angular.module('chriscaseio.controllers', []);
angular.module('chriscaseio.directives', []);
angular.module('chriscaseio.utils', []);

// ---------------------------------------------------------------------------------------------------------------------