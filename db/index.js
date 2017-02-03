'use strict';

var monk = require('monk');
var constants = require('../constants');

function getURI() {
  if (process.env.DBURI) {
    return process.env.DBURI;
  }

  var dbhost = (process.env.DBHOST || process.env.IP || '127.0.0.1'),
      dbname = (process.env.DBNAME || 'lrs');

  return 'mongodb://' + dbhost + '/' + dbname;
}

var dbOpts = { connectTimeoutMS: constants.dbConnectionTimeout, socketTimeoutMS: constants.dbSocketTimeout },
    db = monk(getURI(), dbOpts),
    statements = db.get('statements'),
    results = db.get('results');

module.exports = {
    statements: statements,
    results: results
};
