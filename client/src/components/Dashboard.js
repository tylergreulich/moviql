import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div>
        <div style={{ color: '#eee', fontSize: '2rem', textAlign: 'center' }}>
          <span>Welcome to the Dashboard</span>
        </div>
      </div>
    );
  }
}

export default Dashboard;
