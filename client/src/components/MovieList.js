import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import Movie from './Movie';

class MovieList extends Component {
  // onLike = (event, id) => {
  //   event.preventDefault();
  //   console.log(id);
  // };

  renderMovies() {
    console.log(this.props);
    return this.props.data.movies.map(movie => {
      return (
        <Link to={movie.id} key={movie.id}>
          <li onClick={() => console.log(this.props)}>{movie.title}</li>
          {/* <button onClick={event => this.onLike(movie.id)}>Like</button> */}
        </Link>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    const StyledLink = styled(Link)`
      padding: 1rem 4rem;
      text-decoration: none;
      border: none;
      border-radius: 30px;
      background-color: grey;
      text-transform: uppercase;
    `;

    return (
      <div>
        <ul>{this.renderMovies()}</ul>
        <StyledLink to="/create">Create a Movie</StyledLink>
      </div>
    );
  }
}

export default graphql(queryMovies)(MovieList);
