import React from "react";
import LineChart from './components/LineChart';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from,} from "@apollo/client";
import {onError} from '@apollo/client/link/error';



const errorLink = onError(({ graphQLErrors, networkError}) => {
  if (graphQLErrors){
    graphQLErrors.map(({message, locations, path}) => {
      alert(`GraphqlErrors ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:3000/graphql"}),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export default function App() {

  return (
    <ApolloProvider client = {client}>
      <div className="App">
        <LineChart/>
      </div>
    </ApolloProvider>

  );
}
