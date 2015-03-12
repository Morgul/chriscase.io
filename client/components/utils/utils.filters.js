// ---------------------------------------------------------------------------------------------------------------------
// Small collection of useful filters.
//
// @module utils.filters.js
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Markdown filter (Note: Must be used with ng-bind!)
// ---------------------------------------------------------------------------------------------------------------------

function MarkdownFilter($rootScope, $sce, $cacheFactory)
{
    function simpleHash(s)
    {
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    } // end hash

    if(!$rootScope.markdownCache)
    {
        $rootScope.markdownCache = $cacheFactory('markdown-cache', { capacity: 100 });
    } // end if

    return function markdown(text, skipCache)
    {
        if(text)
        {
            if(!skipCache)
            {
                var hash = simpleHash(text);
                var value = $rootScope.markdownCache.get(hash);
                if(value)
                {
                    return $sce.trustAsHtml(value);
                } // end if
            } // end if

            var mdown = marked(text);

            // Support leading newlines.
            text.replace(/^(\r?\n)+/, function(match)
            {
                mdown = match.split(/\r?\n/).join("<br>") + mdown;
            });

            if(!skipCache)
            {
                $rootScope.markdownCache.put(hash, mdown);
            } // end if

            return $sce.trustAsHtml(mdown);
        } // end if
    }; // end markdown
} // end MarkdownFilter

// ---------------------------------------------------------------------------------------------------------------------
// Fuzzy Date - algorithm borrows from: http://stackoverflow.com/questions/11/how-do-i-calculate-relative-time
// ---------------------------------------------------------------------------------------------------------------------

function FuzzyDateFilter()
{
    // Constants
    var SECOND = 1000;
    var MINUTE = 60 * SECOND;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    var MONTH = 30 * DAY;
    var YEAR = 365 * DAY;

    return function fuzzyFilter(date)
    {
        date = new Date(date);
        var now = new Date();

        var delta = now - date;

        if(delta < 0)
        {
            return "not yet";
        }
        else if(delta < MINUTE)
        {
            return delta < SECOND ? 'one second ago' : Math.round(delta/SECOND) + ' seconds ago';
        }
        else if(delta < 2 * MINUTE)
        {
            return "a minute ago";
        }
        else if(delta < 45 * MINUTE)
        {
            return Math.round(delta/MINUTE) + ' minutes ago';
        }
        else if(delta < 90 * MINUTE)
        {
            return "an hour ago";
        }
        else if(delta < 24 * HOUR)
        {
            return Math.round(delta/HOUR) + ' hours ago';
        }
        else if(delta < 48 * HOUR)
        {
            return "yesterday";
        }
        else if(delta < 30 * DAY)
        {
            return Math.round(delta/DAY) + ' days ago';
        }
        else if(delta < 12 * MONTH)
        {
            var months = Math.floor(delta/MONTH);
            return months <= 1 ? 'one month ago' : months + ' months ago';
        }
        else
        {
            var years = Math.floor(delta/YEAR);
            return years <= 1 ? 'one year ago' : years + ' years ago';
        } // end if
    }; // end fuzzyFilter
} // end FuzzyFilter

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.utils').filter('markdown', ['$rootScope', '$sce', '$cacheFactory', MarkdownFilter]);
angular.module('chriscaseio.utils').filter('fuzzydate', [FuzzyDateFilter]);

// ---------------------------------------------------------------------------------------------------------------------