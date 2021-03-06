// ---------------------------------------------------------------------------------------------------------------------
// SiteHeader
//
// @module header.js
// ---------------------------------------------------------------------------------------------------------------------

function SiteHeaderFactory($route, $location, authSvc)
{
    function SiteHeaderController($scope, $location)
    {
        $scope.isCollapsed = true;

        // Define properties
        Object.defineProperties($scope, {
            authorized: { get: function(){ return authSvc.authorized; } },
            user: { get: function(){ return authSvc.user; } }
        });

        // Watch the location, and update our 'active' button to match.
        $scope.$watch(function(){ return $location.path(); }, function()
        {
            $scope.location = $location.path().substr(1).split('/')[0];
        });

        $scope.admin = function()
        {
            $location.path('/admin');
        }; // end admin

        $scope.signOut = function()
        {
            authSvc.signOut()
                .then(function()
                {
                    $route.reload();
                });
        }; // end signOut
    } // end SiteHeaderController

    return {
        restrict: 'E',
        scope: true,
        templateUrl: "/components/header/header.html",
        controller: ['$scope', '$location', SiteHeaderController],
        replace: true
    };
} // end SiteHeaderFactory

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.directives').directive('siteHeader', [
    '$route',
    '$location',
    'AuthService',
    SiteHeaderFactory
]);

// ---------------------------------------------------------------------------------------------------------------------