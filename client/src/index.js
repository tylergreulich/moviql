import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://frozen-beyond-38940.herokuapp.com/graphql',
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <div>
        <Navigation />
        <Route exact path="/" component={App} />
        <Route exact path="/" component={MovieList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/dashboard/:userid"
          component={requireAuth(Dashboard)}
        />
        <Route exact path="/:id" component={Movie} />
      </div>
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
