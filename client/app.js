// ---------------------------------------------------------------------------------------------------------------------
// Main Angular Application.
//
// @module app.js
// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio', [
        'ngRoute',

        'lodash',
        'ui.bootstrap',
        'truncate',

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
            .when('/blog', { templateUrl: '/components/blog/article_list.html', controller: 'ArticleListController' })
            .when('/blog/:slug*', { templateUrl: '/components/blog/article.html', controller: 'ArticleController' })
            .when('/admin', { templateUrl: '/components/admin/admin.html', controller: 'AdminController' })
            .when('/admin/blog', { templateUrl: '/components/admin/blog/add_edit.html', controller: 'AddEditArticleController' })
            .when('/admin/blog/:slug*', { templateUrl: '/components/admin/blog/add_edit.html', controller: 'AddEditArticleController' })
            .otherwise({redirectTo: '/'});
    }]);

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.services', []);
angular.module('chriscaseio.controllers', []);
angular.module('chriscaseio.directives', []);
angular.module('chriscaseio.utils', []);

// ---------------------------------------------------------------------------------------------------------------------