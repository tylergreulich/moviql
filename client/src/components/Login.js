import React, { Component } from 'react';
import AuthForm from './AuthForm';
import LoginMutation from '../mutations/login';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';
import { HashRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    errors: []
  };

  UNSAFE_componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      console.log(this.props);
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUser }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default graphql(currentUser)(graphql(LoginMutation)(Login));
