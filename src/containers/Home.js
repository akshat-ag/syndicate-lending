import React, { Component } from 'react';
import Header from './Header';
import {Route, Redirect, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Footer from '../presentation/Footer';
import LoanApplication from './LoanApplication';
import LoanDetails from './LoanDetails';
import SyndicateForm from './SyndicateForm';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Home extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <React.Fragment>
             <Header/>
             <NotificationContainer />
             <div id="main-content">
                <Switch>
                    <Redirect exact from="/" to="/dashboard"/>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/application" component={LoanApplication} />
                    <Route exact path="/loan/:id" component={LoanDetails}/>
                    <Route exact path="/syndicate/:id" component={SyndicateForm} />

                </Switch>
            </div>
           
            </React.Fragment>

        );
    }
}

export default Home;