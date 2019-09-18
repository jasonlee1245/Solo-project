import React, { Component } from 'react';
import Row from './Row.jsx';

class App extends Component {
    constructor(props) {
      super(props);
      this.state;
    }
  
    render() {
      return (
        <div>
          <Row></Row>
          <Row></Row>
          <Row></Row>
        </div>
      );
    }
  }
  
  export default App;
  