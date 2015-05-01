// ---------------------------------------------------------------------------------------------------------------------
// ArticleController
//
// @module article.js
// ---------------------------------------------------------------------------------------------------------------------

function ArticleController($scope, $routeParams, articleSvc)
{
    articleSvc.get($routeParams.slug)
        .then(function(article)
        {
            $scope.article = article;
        });
} // end ArticleController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('ArticleController', [
    '$scope',
    '$routeParams',
    'ArticleService',
    ArticleController
]);

// ---------------------------------------------------------------------------------------------------------------------