import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';

class Movie extends Component {
  renderMovies() {
    return this.props.data.movies.map(movie => {
      console.log(this.props);
      if (movie.id === this.props.match.params.id)
        return (
          <div onClick={() => console.log(this.props)} key={movie.id}>
            <div>{movie.title}</div>
            <div>{movie.director}</div>
            <div>{movie.releaseDate}</div>
            <div>{movie.rating}</div>
            <div>{movie.description}</div>
            <div>
              {movie.actors
                .map(actor => {
                  return `${actor.firstName} ${actor.lastName}`;
                })
                .join(', ')}
            </div>
          </div>
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
        <StyledLink to="/">Home</StyledLink>
        {this.renderMovies()}
        {/* <StyledLink to="/create">Create a Movie</StyledLink> */}
      </div>
    );
  }
}

export default graphql(queryMovies)(Movie);
