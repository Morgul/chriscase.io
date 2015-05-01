// ---------------------------------------------------------------------------------------------------------------------
// SignInController
//
// @module signin.js
// ---------------------------------------------------------------------------------------------------------------------

function SignInController($scope, $route, authSvc)
{
    $scope.login = {};

    $scope.signin = function()
    {
        authSvc.signIn($scope.login)
            .then(function()
            {
                $scope.error = undefined;
                $route.reload();
            })
            .catch(function(error)
            {
                if(error == 'Unauthorized')
                {
                    $scope.error = "Invalid username / password.";
                }
                else
                {
                    $scope.error = "Unknown Error: " + error;
                } // end if
            });
    };
} // end SignInController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio').controller('SignInController', [
    '$scope',
    '$route',
    'AuthService',
    SignInController
]);

// ---------------------------------------------------------------------------------------------------------------------