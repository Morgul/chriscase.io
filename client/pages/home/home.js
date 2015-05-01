// ---------------------------------------------------------------------------------------------------------------------
// HomeController
//
// @module home.js
// ---------------------------------------------------------------------------------------------------------------------

function HomeController($scope, articleSvc)
{
    articleSvc.listArticles(1, 5)
        .then(function(articles)
        {
            $scope.articles = articles.articles;
        });
} // end HomeController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('HomeController', [
    '$scope',
    'ArticleService',
    HomeController
]);

// ---------------------------------------------------------------------------------------------------------------------