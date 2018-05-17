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
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit}>
          <div className="input-field">
            <input
              type="email"
              value={this.state.email}
              placeholder="Email"
              required
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              required
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
