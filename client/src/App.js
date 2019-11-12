import React, { Component } from "react";
import apolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";

import PeopleList from "./components/PeopleList";
import AddPerson from "./components/AddPerson";

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
});

const client = new apolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <PeopleList />
          <AddPerson />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
