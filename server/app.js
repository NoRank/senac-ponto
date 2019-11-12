const { createServer } = require("http");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const app = express();
app.use(cors());

mongoose.connect("mongodb://manager:123456g@ds141188.mlab.com:41188/gql-time");
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});

const WS_PORT = 5000;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () =>
  console.log(`Websocket Server is now running on http://localhost:${WS_PORT}`)
);

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: websocketServer,
    path: "/graphql"
  }
);
