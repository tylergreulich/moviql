import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import { InfoContainer, InfoTitle } from './StyledComponents';
import MovieDetails from './MovieDetails';
import Aux from '../hoc/Auxiliary';
import currentUser from '../queries/currentUser';

const BackButton = styled(Link)`
  padding: 1.2rem 4rem;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  background: #e50914;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
`;

class Movie extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimiiticResponse: {
        __typename: 'Mutation',
        likeMovie: {
          id,
          __typename: 'MovieType',
          likes: likes + 1
        }
      }
    });
  }

  renderMovies() {
    return this.props.data.movies.map(
      ({ movie, likes, id, headerImg, imgUrl, title, description }) => {
        if (id === this.props.match.params.id)
          return (
            <Aux key={id}>
              <header>
                <img src={headerImg} alt="" />
              </header>
              <div
                key={id}
                style={{ margin: '3.5rem 0 0 3rem', display: 'flex' }}
              >
                <img
                  src={imgUrl}
                  alt=""
                  style={{ maxWidth: '259px', maxHeight: '384px' }}
                />
                <InfoContainer>
                  <InfoTitle>
                    <div>{title}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i
                        className="material-icons"
                        onClick={() => this.onLike(id)}
                        style={{ padding: '0 .5rem 0 0', cursor: 'pointer' }}
                      >
                        thumb_up
                      </i>
                      {likes}
                    </div>
                  </InfoTitle>
                  <MovieDetails>{description}</MovieDetails>
                  <BackButton to="/">
                    <span>Back</span>
                  </BackButton>
                </InfoContainer>
              </div>
            </Aux>
          );
      }
    );
  }

  render() {
    console.log(this.props.data);
    if (this.props.data.loading) {
      return <div style={{ visibility: 'hidden' }} />;
    }

    return <div>{this.renderMovies()}</div>;
  }
}

const mutation = gql`
  mutation addLike($id: ID) {
    likeMovie(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(graphql(queryMovies)(Movie));
