import React, { Component } from 'react';
import Header from './Header';
import {Route, Redirect, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Footer from '../presentation/Footer';


class Home extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <React.Fragment>
             <Header/>
             <div id="main-content">
                <Switch>
                    <Redirect exact from="/" to="/dashboard"/>
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
            <Footer/>
            </React.Fragment>

        );
    }
}

export default Home;