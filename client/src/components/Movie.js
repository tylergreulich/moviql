import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import { InfoContainer, InfoTitle } from './StyledComponents';
import MovieDetails from './MovieDetails';

const BackButton = styled(Link)`
  padding: 1.2rem 4rem;
  margin: 1.5rem 0;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  background: linear-gradient(to right, #e10098, #dd2476);
  border: none;
  border-radius: 2rem;
  cursor: pointer;
`;

class Movie extends Component {
  renderMovies() {
    return this.props.data.movies.map(movie => {
      if (movie.id === this.props.match.params.id)
        return (
          <div
            onClick={() => console.log(this.props)}
            key={movie.id}
            style={{ margin: '3.5rem 0 0 3rem', display: 'flex' }}
          >
            <img
              src={movie.imgUrl}
              style={{ maxWidth: '259px', maxHeight: '384px' }}
            />
            <InfoContainer>
              <InfoTitle>
                <div>{movie.title}</div>
              </InfoTitle>
              <figure>
                {' '}
                Starring:
                {movie.actors
                  .map(actor => {
                    return `${actor.firstName} ${actor.lastName}`;
                  })
                  .join(', ')}
              </figure>
              <MovieDetails>{movie.director}</MovieDetails>
              <MovieDetails>{movie.releaseDate}</MovieDetails>
              <MovieDetails>{movie.rating}</MovieDetails>
              <MovieDetails>{movie.description}</MovieDetails>
              <BackButton to="/">
                <span>Back</span>
              </BackButton>
            </InfoContainer>
          </div>
        );
    });
  }

  render() {
    console.log(this.props.data);
    if (this.props.data.loading) {
      return <div style={{ visibility: 'hidden' }} />;
    }

    return <div>{this.renderMovies()}</div>;
  }
}

export default graphql(queryMovies)(Movie);
