import React, { Component } from 'react';
import AuthForm from './AuthForm';
import LoginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';

class Login extends Component {
  onSubmit = ({ email, password }) => {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]
    });
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default graphql(LoginMutation)(Login);
