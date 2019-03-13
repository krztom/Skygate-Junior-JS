import React, { Component } from 'react';
import './App.css';
import FormBuilder from './containers/FormBuilder/FormBuilder';

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Form builder
          </h1>
        </header>
        <FormBuilder />
      </div>
    );
  }
}

export default App;
