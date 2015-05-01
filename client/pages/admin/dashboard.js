// ---------------------------------------------------------------------------------------------------------------------
// DashboardController
//
// @module dashboard.js
// ---------------------------------------------------------------------------------------------------------------------

function DashboardController($scope, $location, $modal, ngToast, articleSvc)
{
    articleSvc.listArticles(0, -1)
        .then(function(data)
        {
            $scope.articles = data.articles;
        });

    $scope.addArticle = function()
    {
        $location.path('/admin/blog');
    };

    $scope.editArticle = function(slug)
    {
        $location.path('/admin/blog/' + slug);
    }; // end editArticle

    $scope.publishArticle = function(article)
    {
        article.published = true;

        articleSvc.save(article)
            .then(function()
            {
                ngToast.create("Post published.");
            });
    }; // end publish

    $scope.unpublishArticle = function(article)
    {
        article.published = false;

        articleSvc.save(article)
            .then(function()
            {
                ngToast.create("Post unpublished.");
            });
    }; // end unpublish

    $scope.deleteArticle = function(slug)
    {
        var modalInstance = $modal.open({
            templateUrl: '/pages/admin/blog/delete.html',
            size: 'lg'
        });

        modalInstance.result.then(function()
        {
            articleSvc.delete(slug)
                .then(function()
                {
                    ngToast.create("Post deleted.");

                    return articleSvc.listArticles(0, -1)
                        .then(function(data)
                        {
                            $scope.articles = data.articles;
                        });
                });
        });
    }; // end deleteArticle
} // end DashboardController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('DashboardController', [
    '$scope',
    '$location',
    '$modal',
    'ngToast',
    'ArticleService',
    DashboardController
]);

// ---------------------------------------------------------------------------------------------------------------------