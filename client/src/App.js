import React, { Component } from 'react';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    // console.log(this.props);
    return (
      <Navigation>
        <div className="App" />
      </Navigation>
    );
  }
}

export default App;
