import React, { Component } from 'react';
import Header from './Header';
import {Route, Redirect, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Footer from '../presentation/Footer';
import LoanApplication from './LoanApplication';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238' 
    },
    secondary: cyan,
  }
});

class Home extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <React.Fragment>
             <Header/>
             <div id="main-content">
                <Switch>
                    <Redirect exact from="/" to="/dashboard"/>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/application" component={LoanApplication} />
                </Switch>
            </div>
            <Footer/>
            </React.Fragment>
            </MuiThemeProvider>

        );
    }
}

export default Home;