import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import currentUser from '../queries/currentUser';
import { graphql } from 'react-apollo';
import LogoutMutation from '../mutations/logout';

class Navigation extends Component {
  logoutClickHandler = () => {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    });
  };

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <Link to="/" onClick={this.logoutClickHandler}>
            Logout
          </Link>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.data);
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to="/"
              className="brand logo-left"
              style={{ fontSize: '1.4rem' }}
            >
              Home
            </Link>
            <ul className="right" style={{ fontSize: '1.4rem' }}>
              {this.renderButtons()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default graphql(LogoutMutation)(graphql(currentUser)(Navigation));
