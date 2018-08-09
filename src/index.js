import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import {AuthenticatedRoute} from './containers/AuthenticatedRoute';
import App from './App';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/login/" component={Login} />
        <AuthenticatedRoute component={App} />
      </Switch>
    </Router>, document.getElementById('root')
    );
