import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import BorrowerDashboard from './BorrowerDashboard';
import LeadArrangerDashboard from './LeadArrangerDashboard';
import {NotificationContainer, NotificationManager} from 'react-notifications';
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
            return <BorrowerDashboard />
        } else {
            return <LeadArrangerDashboard />
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