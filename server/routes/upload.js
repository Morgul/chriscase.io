//----------------------------------------------------------------------------------------------------------------------
// Routes for uploading files
//
// @module contact.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var express = require('express');
var multer  = require('multer');

var routeUtils = require('./utils');
var models = require('../models');

var logger = require('omega-logger').loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

var router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Middleware
//----------------------------------------------------------------------------------------------------------------------

// Setup support for file uploads
router.use(multer({
    onFileUploadStart: uploadStartHandler,
    dest: './uploads/'
}));

// Basic request logging
router.use(routeUtils.requestLogger(logger));

// Basic error logging
router.use(routeUtils.errorLogger(logger));

//----------------------------------------------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------------------------------------------

function uploadStartHandler(file, req, res)
{
    // Only allow uploads from authenticated users
    if(!req.isAuthenticated())
    {
        return false;
    } // end if
} // end uploadStartHandler

//----------------------------------------------------------------------------------------------------------------------
// REST Endpoints
//----------------------------------------------------------------------------------------------------------------------

router.post('/', function(req, resp)
{
    if(req.isAuthenticated())
    {
        console.log('got attempt at upload file:', req.files.file);
        resp.json({
            originalName: req.files.file.originalname,
            url: '/' + req.files.file.path
        });
    }
    else
    {
        // Not allowed to upload.
        resp.status(403).end();
    } // end if
});

//----------------------------------------------------------------------------------------------------------------------

module.exports = router;

//----------------------------------------------------------------------------------------------------------------------