import React, { Component } from 'react';

class AuthForm extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  };

  render() {
    const errorMessage = {
      color: 'red',
      fontSize: '15px'
    };

    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit}>
          <div className="input-field">
            <input
              type="email"
              value={this.state.email}
              placeholder="Email"
              onChange={event => this.setState({ email: event.target.value })}
              style={{ color: '#eee' }}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              style={{ color: '#eee' }}
            />
          </div>

          <div style={errorMessage}>
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
