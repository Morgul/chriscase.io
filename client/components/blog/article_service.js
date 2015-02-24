// ---------------------------------------------------------------------------------------------------------------------
// ArticleService
//
// @module article_service.js
// ---------------------------------------------------------------------------------------------------------------------

function ArticleServiceFactory(Promise, $http, $cacheFactory, _)
{
    function ArticleService()
    {
        this.cache = $cacheFactory('articleCache', { count: 500 });
    } // end ArticleService

    ArticleService.prototype.listArticles = function(page, count)
    {
        var self = this;
        return Promise(function(resolve, reject)
        {
            $http.get('/blog', { params: { page: page, count: count } })
                .success(function(data)
                {
                    _.each(data.articles, function(article)
                    {
                        self.cache.put(article.slug, article);
                    });

                    resolve(data);
                })
                .error(function(data)
                {
                    reject(data);
                });
        });
    }; // end listArticles

    ArticleService.prototype.get = function(slug)
    {
        var self = this;
        return Promise(function(resolve, reject)
        {
            var article = self.cache.get(slug);

            if(article)
            {
                resolve(article);
            }
            else
            {
                $http.get('/blog/' + slug)
                    .success(function(data)
                    {
                        self.cache.put(slug, article);
                        resolve(data);
                    })
                    .error(function(data)
                    {
                        reject(data);
                    });
            } // end if
        });
    }; // end get

    ArticleService.prototype.set = function(article)
    {
        //TODO: make this do stuff!
    }; // end set

    return new ArticleService();
} // end ArticleServiceFactory

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.services').service('ArticleService', [
    '$q',
    '$http',
    '$cacheFactory',
    'lodash',
    ArticleServiceFactory
]);

// ---------------------------------------------------------------------------------------------------------------------