//----------------------------------------------------------------------------------------------------------------------
// Models for ChrisCase.io
//
// @module models.js
//----------------------------------------------------------------------------------------------------------------------

var path = require('path');
var jbase = require('jbase');

//----------------------------------------------------------------------------------------------------------------------

var db = { errors: jbase.errors };
var rootPath = path.join(__dirname, 'db');

//----------------------------------------------------------------------------------------------------------------------

function slugify(article)
{
    return article.title.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
} // end slugify

//----------------------------------------------------------------------------------------------------------------------
// Models
//----------------------------------------------------------------------------------------------------------------------

db.Page = jbase.defineModel('pages', {
    title: { type: String, required: true },
    url: String,
    content: String,
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
}, { rootPath: rootPath, pk: 'url' });

db.Article = jbase.defineModel('articles', {
    title: { type: String, required: true },
    subtitle: String,
    slug: String,
    content: String,
    author: String,
    published: { type: Boolean, default: false },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
}, { rootPath: rootPath, pk: 'slug', idFunc: slugify });

db.User = jbase.defineModel('users', {
    username: String,
    tagline: String,
    email: String,
    displayName: String,
    hash: String,
    salt: String,
    iterations: Number,
    created: { type: Date, default: Date.now() }
}, { rootPath: rootPath, pk: 'username' });

//----------------------------------------------------------------------------------------------------------------------

module.exports = db;

//----------------------------------------------------------------------------------------------------------------------
