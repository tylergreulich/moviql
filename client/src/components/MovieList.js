import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { StyledImage, StyledContainer } from './StyledComponents';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import './MovieList.css';

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
        <div>
          <StyledLink to={movie.id} key={movie.id}>
            <StyledImage
              src={movie.imgUrl}
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
            {/* <button onClick={event => this.onLike(movie.id)}>Like</button> */}
          </StyledLink>
        </div>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <div>
        <StyledContainer>{this.renderMovies()}</StyledContainer>
      </div>
    );
  }
}

export default graphql(queryMovies)(MovieList);
