// ---------------------------------------------------------------------------------------------------------------------
// AuthService
//
// @module auth.js
// ---------------------------------------------------------------------------------------------------------------------

function AuthServiceFactory($http, Promise)
{
    function AuthService()
    {
        var self = this;
        this.initialized = Promise(function(resolve)
        {
            $http.get('/auth/user')
                .success(function(data)
                {
                    self.user = data;
                    resolve();
                })
                .error(function()
                {
                    // Don't care why it blew up; we assume we're not logged in.
                    resolve();
                });
        });
    } // end AuthService

    AuthService.prototype = {
        get authorized() { return !!this._user; },
        get user() { return this._user; },
        set user(val)
        {
            if(val)
            {
                Object.defineProperty(val, 'display', {
                    get: function(){ return this.displayName || this.username; }
                });
            } // end if

            this._user = val;
        }
    }; // end signOut

    AuthService.prototype.signIn = function(loginData)
    {
        var self = this;
        return Promise(function(resolve, reject)
        {
            $http.post('/auth/login', loginData)
                .success(function(data)
                {
                    self.user = data;
                    resolve();
                })
                .error(function(data, status)
                {
                    console.log('failed to log in:', data, status);
                    reject(data);
                });
        });
    };

    AuthService.prototype.signOut = function()
    {
        var self = this;
        return new Promise(function(resolve, reject)
        {
            $http.post('/auth/logout')
                .success(function()
                {
                    self._user = undefined;
                    resolve();
                })
                .error(function(error)
                {
                    reject(error);
                });
        });
    }; // end signOut

    return new AuthService();
} // end AuthServiceFactory

// ---------------------------------------------------------------------------------------------------------------------

angular.module('chriscaseio.services').service('AuthService', [
    '$http',
    '$q',
    AuthServiceFactory
]);

// ---------------------------------------------------------------------------------------------------------------------