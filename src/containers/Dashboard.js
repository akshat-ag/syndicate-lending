import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import BorrowerDashboard from './BorrowerDashboard';
import LeadArrangerDashboard from './LeadArrangerDashboard';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        let user = this.authenticedServiceInstance.getUserInfo();
        this.setState({user});
    }
    getUserDashboard() {
        if(this.state.user.role === "borrower"){
            return (
                <div>
                <AppBar position="static" id="dashbRow">
                <Toolbar id="headerBot">
                <Typography id="loggedInAs" variant="subheading" color="inherit">
               			Home / Dashboard
               			</Typography>
                <div id="logout">
                <Typography variant="sunbheading" color="inherit">
               			Logged in as Borrower
               			</Typography>
                </div>
                </Toolbar>
            </AppBar>
            <BorrowerDashboard />
            </div>
        )
        } else {
            return(
                <div>
                <AppBar position="static" id="dashbRow">
                <Toolbar id="headerBot">
                <Typography id="loggedInAs" variant="subheading" color="inherit">
               			Home / Dashboard
               			</Typography>
                <div id="logout">
                <Typography variant="sunbheading" color="inherit">
               			Logged in as Bank
               			</Typography>
                </div>
                </Toolbar>
            </AppBar>
            <LeadArrangerDashboard />
            </div>
        )
        }
    }
    render() {
        if(this.state.user.role) {
        return (
            <div id="dashboard">
                {this.getUserDashboard()}
              
            </div>
        );
    } else {
        return <div>pending</div>
    }
    }
}

export default Dashboard;