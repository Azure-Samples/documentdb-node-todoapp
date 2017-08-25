var config = {}

config.host = process.env.HOST || "https://nodetodo-sh.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "znQFFGe3bBRrUywRvhHtVmaJpfV0TqLkeN8HR0YnLoXCzXQVIzFqKSUg7BHN1zoHxwIMZDxOmlX0ETBqtxKbeA==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;
