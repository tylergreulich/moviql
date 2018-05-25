import React, { Component } from 'react';
import currentUserQuery from '../queries/currentUser';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(withRouter(RequireAuth));
};
