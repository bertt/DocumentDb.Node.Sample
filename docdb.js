var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {

    getDatabase: function(client,dbName,callback){
        var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.id=@id',
                    parameters: [{
                        name: '@id',
                        value: dbName
                    }]
                };

        client.queryDatabases(querySpec).toArray(function (err, results) {
            if(results.length>0){
                var db=results[0];
                if(db!=null){
                    callback(db);
                }
            }
        });
    },


    getCollections:function(client, databaseLink, callback) { 
            var queryIterator = client.readCollections(databaseLink).toArray(function (err, cols) {
            callback(cols); 
        }); 
    },
 

    getCollection: function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };             

        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if(results.length>0){
                var collection=results[0];
                if(collection!=null){
                    callback(collection);
                }
            }
        });
    },

    getDocuments: function (client, collectionLink, querySpec, callback) {
        client.queryDocuments(collectionLink, querySpec).toArray(function (err, results) {
            console.log('results: ' + results.length);
            if(results.length>0){
                callback(results);
            }
        });
    },

    createDocument: function(client,collectionLink, documentDefinition,callback){
        client.createDocument(collectionLink, documentDefinition, function(err, document) {
            callback(document);
        });
    },

    replaceDocument: function(client,collectionLink,oldDoc,newDoc,callback){
        client.replaceDocument(oldDoc._self, newdoc, function (err, replaced) {
            callback(replaced);
        });
    }
}

module.exports = DocDBUtils;
