/*
** DocumentDB Utilities
**  - Useful, reusable code for our application
*/
"use strict";


var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
    // getOrCreateDatabase
    //  Connect to existing database or create it (by databaseId)
    getOrCreateDatabase: function (client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };

                    client.createDatabase(databaseSpec, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    },

    // getOrCreateCollection
    //  Connect to existing collection or create it (by collectionId)
    getOrCreateCollection: function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };             

        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {        
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };

                    var requestOptions = {
                        offerType: 'S1'
                    };

                    client.createCollection(databaseLink, collectionSpec, requestOptions, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    }
};

module.exports = DocDBUtils;