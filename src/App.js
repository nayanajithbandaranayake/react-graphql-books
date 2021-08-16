import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpdateBook from "./components/UpdataBook";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <BookList />
          </Route>
          <Route path="/add">
            <AddBook />
          </Route>
          <Route path="/update/:id">
            <UpdateBook />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
