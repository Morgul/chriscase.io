//----------------------------------------------------------------------------------------------------------------------
// Routes for blog activty
//
// @module blog.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var express = require('express');

var routeUtils = require('./utils');
var models = require('../models');

var logger = require('omega-logger').loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

var router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Middleware
//----------------------------------------------------------------------------------------------------------------------

// Basic request logging
router.use(routeUtils.requestLogger(logger));

// Basic error logging
router.use(routeUtils.errorLogger(logger));

//----------------------------------------------------------------------------------------------------------------------
// REST Endpoints
//----------------------------------------------------------------------------------------------------------------------

router.get('/', function(req, resp)
{
    routeUtils.interceptHTML(resp, function()
    {
        var page = req.query.page || 1;
        var perPage = req.query.count || 25;

        models.Article.all()
            .then(function(articles)
            {
                return _.sortBy(articles, function(revision)
                {
                    return revision.created;
                }).reverse();
            })
            .then(function(articles)
            {
                var start = (page * perPage) - perPage;
                var end = (page * perPage);

                // Handle the 'get all' condition
                if(perPage < 0)
                {
                    start = 0;
                    end = articles.length;
                }
                else
                {
                    articles = _.reduce(articles, function(results, article)
                    {
                        if(article.published)
                        {
                            results.push(article);
                        } // end if

                        return results;
                    }, []);
                } // end if

                return {
                    total: articles.length,
                    articles: articles.slice(start, end)
                };
            })
            .then(function(articles)
            {
                resp.json(articles);
            });
    });
});

router.get('/*', function(req, resp)
{
    routeUtils.interceptHTML(resp, function()
    {
        // Get wildcard parameter
        var slug = req.params[0];

        models.Article.get(slug)
            .then(function(article)
            {
                if(!article.published && !req.isAuthenticated())
                {
                    resp.status(404).end();
                }
                else
                {
                    resp.json(article);
                } // end if
            })
            .catch(models.errors.DocumentNotFound, function()
            {
                resp.status(404).end();
            });
    });
});

router.put('/*', function(req, resp)
{
    // Get wildcard parameter
    var slug = req.params[0];

    if(req.isAuthenticated())
    {
        models.Article.get(slug)
            .then(function(article)
            {
                _.assign(article, req.body);
                article.updated = Date.now();
                return article.save();
            })
            .catch(models.errors.DocumentNotFound, function()
            {
                var article = new models.Article(req.body);
                article.created = Date.now();
                return article.save();
            })
            .then(function(article)
            {
                resp.json(article);
            });
    } // end if
});

router.delete('/*', function(req, resp)
{
    // Get wildcard parameter
    var slug = req.params[0];

    if(req.isAuthenticated())
    {
        models.Article.remove(slug)
            .then(function()
            {
                resp.end();
            })
            .catch(models.errors.DocumentNotFound, function()
            {
                resp.status(404).end();
            });
    } // end if
});

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;

//----------------------------------------------------------------------------------------------------------------------