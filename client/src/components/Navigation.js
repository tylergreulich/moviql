import React, { Component } from 'react';
import { NavBar } from './StyledComponents';
import { HashRouter, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';

class Navigation extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <NavBar>
          <div style={{ width: '68%', margin: '0 auto' }}>
            <span>MoviQL</span>
            <span>Browse</span>
          </div>
          <div style={{ width: '21%' }}>
            <Link to="/login">Login</Link>
            <img alt="Avatar" />
          </div>
        </NavBar>
      </div>
    );
  }
}

export default graphql(currentUser)(Navigation);
