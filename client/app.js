// ---------------------------------------------------------------------------------------------------------------------
// Main Angular Application.
//
// @module app.js
// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio', [
        'ngRoute',

        'lodash',
        'ui.ace',
        'ui.bootstrap',
        'truncate',
        'ngToast',
        'angularFileUpload',
        'angularUtils.directives.dirDisqus',

        'chriscaseio.services',
        'chriscaseio.controllers',
        'chriscaseio.directives',
        'chriscaseio.utils'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', { templateUrl: '/pages/home/home.html', controller: 'HomeController' })
            .when('/about', { templateUrl: '/pages/about/about.html', controller: 'AboutController' })
            .when('/contact', { templateUrl: '/pages/contact/contact.html', controller: 'ContactController' })
            .when('/blog', { templateUrl: '/pages/blog/article_list.html', controller: 'ArticleListController' })
            .when('/blog/:slug*', { templateUrl: '/pages/blog/article.html', controller: 'ArticleController' })
            .when('/admin', { templateUrl: '/pages/admin/admin.html', controller: 'AdminController' })
            .when('/admin/blog', { templateUrl: '/pages/admin/blog/add_edit.html', controller: 'AddEditArticleController' })
            .when('/admin/blog/:slug*', { templateUrl: '/pages/admin/blog/add_edit.html', controller: 'AddEditArticleController' })
            .otherwise({redirectTo: '/'});

        // Configure marked parser
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                return hljs.highlightAuto(code, [lang]).value;
            }
        });
    }])
    .config(['ngToastProvider', function(ngToast)
    {
        ngToast.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            maxNumber: 3
        });
    }]);

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.services', []);
angular.module('chriscaseio.controllers', []);
angular.module('chriscaseio.directives', []);
angular.module('chriscaseio.utils', []);

// ---------------------------------------------------------------------------------------------------------------------