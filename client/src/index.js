import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MovieList from './components/MovieList';
import MovieCreate from './components/MovieCreate';
import { HashRouter, Route } from 'react-router-dom';
import Movie from './components/Movie';
import Navigation from './components/Navigation';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <div>
        <Navigation />
        <Route exact path="/" component={App} />
        <Route exact path="/" component={MovieList} />
        <Route path="/create" component={MovieCreate} />
        <Route exact path="/:id" component={Movie} />
      </div>
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
