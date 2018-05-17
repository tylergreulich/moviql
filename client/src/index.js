import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieCreate from './components/MovieCreate';
import Movie from './components/Movie';
// import Navigation from './components/Navigation';
import Login from './components/Login';

const httpLink = new HttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  // credentials: 'same-origin',
  cache: new InMemoryCache({
    dataIdFromObject: object => object.key || null
  })
});

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <div>
        {/* <Navigation /> */}
        <Route exact path="/" component={App} />
        <Route exact path="/" component={MovieList} />
        {/* <Route path="/create" component={MovieCreate} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/:id" component={Movie} />
      </div>
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
