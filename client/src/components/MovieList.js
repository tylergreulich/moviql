import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  StyledTitle,
  StyledImage,
  StyledContainer,
  H2Home
} from './StyledComponents';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';

const StyledLink = styled(Link)`
  :hover :nth-child(1) + div {
    opacity: 1;
    /* transition: all 0.4s ease-in;
    transform: translateY(-5rem); */
  }
  height: 100%;
`;

class MovieList extends Component {
  renderMovies() {
    console.log(this.props);
    return this.props.data.movies.map(movie => {
      return (
        <StyledLink to={movie.id} key={movie.id}>
          <StyledImage src={movie.imgUrl} alt="" />
          {/* <StyledTitle>{movie.title}</StyledTitle> */}
          {/* <button onClick={event => this.onLike(movie.id)}>Like</button> */}
        </StyledLink>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <H2Home>New Releases</H2Home>
        <StyledContainer>{this.renderMovies()}</StyledContainer>
        {/* <StyledLink to="/create">Create a Movie</StyledLink> */}
      </div>
    );
  }
}

export default graphql(queryMovies)(MovieList);
