var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var docdb = require('./docdb');

console.log('hallo');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var db = docdb.getDatabase(docDbClient,config.databaseId,function(db){
    docdb.getCollections(docDbClient,db._self,function(cols){
        console.log('cols: ' + cols.length);
    });

    console.log('db gevonden!');
    var observations = docdb.getCollection(docDbClient,db._self,config.collectionId, function(observations){
        console.log('observations link: ' + observations._self);
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.Message=@Message',
            parameters: [{
                name: '@Message',
                value: "Hallo"
            }]
        };

        var docs = docdb.getDocuments(docDbClient,observations._self,querySpec,function(docs){
            console.log('nr of docs:' + docs.length);
        })

        // create new document
        var newdoc = { Id: 1, Name: "Bert"};

        docdb.createDocument(docDbClient,observations._self,newdoc,function(doc){
            console.log('doc created i hope');
            console.log('id newdoc:' + doc.id);

            var newdoc=doc;
            newdoc.Name = "Bert1";

            docdb.replaceDocument(doc._self, newdoc, function (err, replaced) {
                console('replaced: ' + replaced.Name);
            });
        })

        // update document

    });
});

