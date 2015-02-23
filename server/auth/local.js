//----------------------------------------------------------------------------------------------------------------------
// Local Authentication Support
//
// @module local.js
//----------------------------------------------------------------------------------------------------------------------

var passport = require('passport');
var LocalStrategy = require('passport-local');

var config = require('../../config');
var models = require('../models');
var hash = require('./hash');

var logger = require('omega-logger').loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

passport.use(new LocalStrategy(function(username, password, done)
{
    models.User.get(username)
        .then(function(user)
        {
            hash.verify(password, { hash: user.hash, salt: user.salt, iterations: user.iterations })
                .then(function(valid)
                {
                    if(!valid)
                    {
                        done(null, false, { message: 'Incorrect password.' });
                    }
                    else
                    {
                        done(null, user);
                    } // end if
                })
                .catch(function(error)
                {
                    done(error);
                });
        })
        .catch(models.errors.DocumentNotFound, function()
        {
            done(null, false, { message: 'Incorrect username.' });
        });
}));

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    initialize: function(app)
    {
        // Remember Me middleware
        app.use(function (req, res, next)
        {
            if(req.method == 'POST' && req.url == '/auth/login')
            {
                if(req.body.remember)
                {
                    req.session.cookie.maxAge = 2592000000; // 30 * 24 * 60 * 60 * 1000 Remember user for 30 days
                }
                else
                {
                    req.session.cookie.expires = false;
                } // end if
            } // end if
            next();
        });

        app.get('/auth/user', function(req, resp)
        {
            if(req.user)
            {
                resp.json(req.user);
            }
            else
            {
                resp.status(403).end();
            } // end if
        });

        app.post('/auth/login', passport.authenticate('local'), function(req, res)
        {
            // Return user back to client
            res.send(req.user);
        });

        // Logout endpoint
        app.post('/auth/logout', function(req, res)
        {
            req.logout();
            res.end();
        });
    }
}; // end exports

//----------------------------------------------------------------------------------------------------------------------