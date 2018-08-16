import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import Login from './containers/Login';
import {AuthenticatedRoute} from './containers/AuthenticatedRoute';
import App from './App';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#263238' 
      },
      secondary: cyan,
    }
  });

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/login/" component={Login} />
        <AuthenticatedRoute component={App} />
      </Switch>
    </Router>
    </MuiThemeProvider>, document.getElementById('root')
    );
