import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GlobalProvider } from './utils/GlobalState';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <GlobalProvider>
      <Pages />
    </GlobalProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
