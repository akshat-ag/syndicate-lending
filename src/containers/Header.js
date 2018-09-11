import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import {NavLink} from 'react-router-dom'
export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.authenticedServiceInstance = AuthenticatedServiceInstance;
	}
	handleLogout = () => {
		this.authenticedServiceInstance.toggleLogin();
		window.location.reload();
	}
	render() {
		return (
			 <div >
        		<AppBar position="static" id="headerr">
            		<Toolbar id="header">
                		<Typography variant="title" color="inherit">
               			Syndicate Loans Platform
               			</Typography>
               			<Tabs >
			            <Tab label="Home"  to='/' component={NavLink}/>
			            <Tab label="Initiate Application" to='/application' component={NavLink}/>
		          	</Tabs>
					  <Button id="logout" onClick={this.handleLogout}>Logout</Button>
            		</Toolbar>
            		
        		</AppBar>
        </div>);
	}
}