// ---------------------------------------------------------------------------------------------------------------------
// ArticleListController
//
// @module article_list.js
// ---------------------------------------------------------------------------------------------------------------------

function ArticleListController($scope, articleSvc)
{
    $scope.currentPage = 1;
    $scope.count = 25;

    $scope.$watch('currentPage', function()
    {
        articleSvc.listArticles($scope.currentPage, $scope.count)
            .then(function(data)
            {
                $scope.articles = data.articles;
                $scope.totalArticles = data.total;
            });
    });
} // end ArticleListController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('ArticleListController', [
    '$scope',
    'ArticleService',
    ArticleListController
]);

// ---------------------------------------------------------------------------------------------------------------------