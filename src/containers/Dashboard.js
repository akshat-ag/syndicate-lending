import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import BorrowerDashboard from './BorrowerDashboard';
class Dashboard extends Component {
    
    componentDidMount() {
        
    }
    render() {
        return (
            <div id="dashboard">
              <BorrowerDashboard />
            </div>
        );
    }
}

export default Dashboard;