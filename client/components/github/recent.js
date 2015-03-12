// ---------------------------------------------------------------------------------------------------------------------
// GitHubRecentDirective
//
// @module recent.js
// ---------------------------------------------------------------------------------------------------------------------

function GitHubRecentDirectiveFactory($http, $sce)
{
    function GitHubRecentDirectiveController($scope)
    {
        $scope.events = undefined;

        $http.get('https://api.github.com/users/morgul/events')
            .success(function(data)
            {
                $scope.events = data.slice(0, 5);
            });

        $scope.repoURL = function(apiURL)
        {
            return apiURL.replace('https://api.github.com/repos', 'https://github.com')
        }; // end repoURL

        $scope.eventIcon = function(type)
        {
            switch(type)
            {
                case "CommitCommentEvent":
                    return "fa-comments-o";
                case "CreateEvent":
                    return "fa-plus";
                case "DeleteEvent":
                    return "fa-times";
                case "ForkEvent":
                    return "fa-code-fork";
                case "GollumEvent":
                    return "fa-file-text-o";
                case "IssueCommentEvent":
                    return "fa-comment-o";
                case "IssuesEvent":
                    return "fa-bug";
                case "MemberEvent":
                    return "fa-user";
                case "PublicEvent":
                    return "fa-user";
                case "PullRequestEvent":
                    return "fa-code-fork";
                case "PullRequestReviewCommentEvent":
                    return "fa-comments-o";
                case "PushEvent":
                    return "fa-cloud-upload";
                case "ReleaseEvent":
                    return "fa-cloud-download";
                case "WatchEvent":
                    return "fa-eye";
            } // end switch
        }; // end eventIcon

        $scope.eventText = function(event)
        {
            switch(event.type)
            {
                case "CommitCommentEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> commented on '
                        + '<a href="'
                        + event.payload.comment.html_url
                        + '">'
                        + event.payload.comment.path
                        + '</a>'
                    );
                case "CreateEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> created '
                        + event.payload.ref_type
                        + ' <code>'
                        // FIXME: I assume it's a repo; I'm being lazy. It could be... something else?
                        + (event.payload.ref != null ? event.payload.ref : event.repo.name)
                        + '</code>'
                    );
                case "DeleteEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> deleted '
                        + event.payload.ref_type
                        + ' <code>'
                        + event.payload.ref
                        + '</code>'
                    );
                case "ForkEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> forked '
                        //TODO: FINISH
                    );
                case "GollumEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> '
                        + event.payload.action
                        //TODO: FINISH
                    );
                case "IssueCommentEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> commented on '
                        + '<a href="'
                        + event.payload.comment.html_url
                        + '"> #'
                        + event.payload.issue.number
                        + ' '
                        + event.payload.issue.title
                        + '</a>'
                    );
                case "IssuesEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> '
                        + event.payload.action
                        + ' <a href="'
                        + event.payload.issue.html_url
                        + '">#'
                        + event.payload.issue.number
                        + ' '
                        + event.payload.issue.title
                        + '</a>'
                    );
                case "MemberEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> '
                        + event.payload.action
                        + ' <a href="'
                        + event.payload.member.html_url
                        + '">'
                        + event.payload.member.login
                        +'</a> '
                    );
                case "PublicEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> made '
                        + event.repo
                        + ' public.'
                        //TODO: FINISH
                    );
                case "PullRequestEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> created PR '
                        + '<a href="'
                        + event.payload.pull_request.html_url
                        + '">#'
                        + event.payload.pull_request.number
                        + ' '
                        + event.payload.pull_request.title
                        + '</a>'
                    );
                case "PullRequestReviewCommentEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> commented on PR '
                        + '<a href="'
                        + event.payload.comment.html_url
                        + '">#'
                        + event.payload.pull_request.number
                        + ' '
                        + event.payload.pull_request.title
                        + '</a>'
                    );
                case "PushEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> pushed to '
                        + '<a href="http://github.com/'
                        + event.repo.name
                            + '/tree/'
                        + event.payload.ref.replace('refs/heads/', '')
                        + '">'
                        + event.payload.ref.replace('refs/heads/', '')
                        + '</a>'
                    );
                case "ReleaseEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> '
                        + event.payload.action
                        + ' release '
                        + '<a href="'
                        + event.payload.release.html_url
                        + '">'
                        + (!!event.payload.release.name ? event.payload.release.name : event.payload.release.tag_name)
                        + '</a>'
                    );
                case "WatchEvent":
                    return $sce.trustAsHtml('<a href="https://github.com/'
                        + event.actor.login + '">'
                        + event.actor.login
                        +'</a> started watching '
                        + event.repo
                        + ' public.'
                        //TODO: FINISH
                    );
            } // end switch
        }; // end eventText
    } // end GitHubRecentDirectiveController

    return {
        restrict: 'E',
        scope: true,
        templateUrl: "/components/github/recent.html",
        controller: ['$scope', GitHubRecentDirectiveController]
    };
} // end GitHubRecentDirectiveFactory

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.directives').directive('githubRecent', [
    '$http',
    '$sce',
    GitHubRecentDirectiveFactory
]);

// ---------------------------------------------------------------------------------------------------------------------