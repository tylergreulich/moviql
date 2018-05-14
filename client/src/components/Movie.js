import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import { InfoContainer, InfoTitle } from './StyledComponents';

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
              alt="Broken Image"
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
              <figure>
                <div>{movie.director}</div>
              </figure>
              <figure>
                <div>{movie.releaseDate}</div>
              </figure>
              <figure>
                <div>{movie.rating}</div>
              </figure>
              <figure>
                <div>{movie.description}</div>
              </figure>
              <BackButton to="/">
                <span>Back</span>
              </BackButton>
            </InfoContainer>
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
      </div>
    );
  }
}

export default graphql(queryMovies)(Movie);