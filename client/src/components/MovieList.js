import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { StyledImage, StyledContainer } from './StyledComponents';
import styled from 'styled-components';
import queryMovies from '../queries/queryMovies';
import './MovieList.css';
import axios from 'axios';

const StyledLink = styled(Link)`
  :hover :nth-child(1) + div {
    opacity: 1;
  }
  height: 100%;
`;

class MovieList extends Component {
  renderMovies() {
    return this.props.data.movies.map((movie, id) => {
      return (
        <div key={movie.id}>
          <StyledLink to={movie.id}>
            <StyledImage
              src={movie.imgUrl}
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </StyledLink>
        </div>
      );
    });
  }

  componentWillMount() {}

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
