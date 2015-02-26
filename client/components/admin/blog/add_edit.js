// ---------------------------------------------------------------------------------------------------------------------
// AddEditArticleController
//
// @module add_edit.js
// ---------------------------------------------------------------------------------------------------------------------

function AddEditArticleController($scope, $routeParams, $location, articleSvc)
{
    $scope.article = {};

    if($routeParams.slug)
    {
        articleSvc.get($routeParams.slug)
            .then(function(article)
            {
                $scope.article = article;
            });
    } // end if

    // -----------------------------------------------------------------------------------------------------------------
    // Functions
    // -----------------------------------------------------------------------------------------------------------------

    $scope.publish = function()
    {
        $scope.article.published = true;

        articleSvc.save($scope.article)
            .then(function()
            {
                $location.path('/admin');
            });
    }; // end publish

    $scope.unpublish = function()
    {
        $scope.article.published = false;

        articleSvc.save($scope.article)
            .then(function()
            {
                $location.path('/admin');
            });
    }; // end unpublish

    $scope.save = function()
    {
        articleSvc.save($scope.article)
            .then(function()
            {
                $location.path('/admin');
            });
    }; // end save

    $scope.delete = function()
    {
        articleSvc.delete($routeParams.slug)
            .then(function()
            {
                $location.path('/admin');
            });
    }; // end delete

    $scope.cancel = function()
    {
        $location.path('/admin');
    }; // end cancel
} // end AddEditArticleController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('AddEditArticleController', [
    '$scope',
    '$routeParams',
    '$location',
    'ArticleService',
    AddEditArticleController
]);

// ---------------------------------------------------------------------------------------------------------------------