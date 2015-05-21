var config = {}

config.host = process.env.HOST || "put here the host url of azure documentdb host";
config.authKey = process.env.AUTH_KEY || "put here the auth key of document db host";
config.databaseId = "earthwatchers";
config.collectionId = "observations";

module.exports = config;