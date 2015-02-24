//----------------------------------------------------------------------------------------------------------------------
// Routes for config activity
//
// @module admin.js
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
                resp.json(article);
            })
            .catch(models.errors.DocumentNotFound, function()
            {
                resp.status(404).end();
            });
    });
});

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;

//----------------------------------------------------------------------------------------------------------------------