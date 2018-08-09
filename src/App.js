import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/Home';
import './App.css';


class App extends Component {
  render() {
    return (
      <Route path="/" component={Home} />
    );
  }
}

export default App;
