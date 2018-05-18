import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import SignupMutation from '../mutations/signup';
import currentUser from '../queries/currentUser';
import { HashRouter } from 'react-router-dom';

class Signup extends Component {
  state = {
    errors: []
  };

  UNSAFE_componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUser }]
      })
      .then()
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(currentUser)(graphql(SignupMutation)(Signup));
