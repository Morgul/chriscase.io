// ---------------------------------------------------------------------------------------------------------------------
// AddEditArticleController
//
// @module add_edit.js
// ---------------------------------------------------------------------------------------------------------------------

function AddEditArticleController($scope, $routeParams, $location, FileUploader, ngToast, authSvc, articleSvc)
{
    $scope.article = {};

    // Setup file uploader
    $scope.uploader = new FileUploader({
        url: '/upload',
        autoUpload: true,
        removeAfterUpload: true,
        onCompleteItem: function(item, response, status, headers)
        {
            var imageMarkdown = "![Image: '" + response.originalName + "'](" + response.url + " \"" + response.originalName + "\")";
            $scope.editor.insert(imageMarkdown);
        },
        onCompleteAll: function()
        {
            ngToast.create("Image successfully uploaded.");
        }
    });

    // Filter to just images
    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item)
        {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    authSvc.initialized
        .then(function()
        {
            if(!authSvc.authorized)
            {
                $location.path('/admin');
            }
            else if($routeParams.slug)
            {
                articleSvc.get($routeParams.slug)
                    .then(function(article)
                    {
                        $scope.article = article;
                    });
            } // end if
        });

    // -----------------------------------------------------------------------------------------------------------------
    // Functions
    // -----------------------------------------------------------------------------------------------------------------

    $scope.aceOnLoad = function(editor)
    {
        $scope.editor = editor;
    }; // end aceOnLoad

    $scope.publish = function()
    {
        $scope.article.published = true;

        articleSvc.save($scope.article)
            .then(function()
            {
                ngToast.create("Post published.");
            });
    }; // end publish

    $scope.unpublish = function()
    {
        $scope.article.published = false;

        articleSvc.save($scope.article)
            .then(function()
            {
                ngToast.create("Post unpublished.");
            });
    }; // end unpublish

    $scope.save = function()
    {
        articleSvc.save($scope.article)
            .then(function()
            {
                ngToast.create("Post saved.");
            });
    }; // end save

    $scope.delete = function()
    {
        articleSvc.delete($routeParams.slug)
            .then(function()
            {
                ngToast.create("Post deleted.");
                $location.path('/admin');
            });
    }; // end delete

    $scope.back = function()
    {
        $location.path('/admin');
    }; // end cancel
} // end AddEditArticleController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.controllers').controller('AddEditArticleController', [
    '$scope',
    '$routeParams',
    '$location',
    'FileUploader',
    'ngToast',
    'AuthService',
    'ArticleService',
    AddEditArticleController
]);

// ---------------------------------------------------------------------------------------------------------------------