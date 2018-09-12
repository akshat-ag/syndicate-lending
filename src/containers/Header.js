import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import {NavLink} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ProfilePopper from '../presentation/ProfilePopper';
const styles = theme => ({
	tabs: {
		flex: 1
	}
 });
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.authenticedServiceInstance = AuthenticatedServiceInstance;
		this.state = {
			user : {},
			open: false
		}
	}
	componentDidMount() {
		let user =this.authenticedServiceInstance.getUserInfo();
		this.setState({user});
	}
	handleLogout = () => {
		this.authenticedServiceInstance.toggleLogin();
		window.location.reload();
	}
	checkUser = () => {
		let role = this.authenticedServiceInstance.getUserRole();
		return role;
	}
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	}
	handleClose = (event, anchorEl) => {
		if (anchorEl.contains(event.target)) {
		  return;
		}
	
		this.setState({ open: false });
	  };
	render() {
		const { classes } = this.props;
		return (
			 <div >
        		<AppBar position="static" id="headerr">
            		<Toolbar id="header">
                		<Typography variant="title" color="inherit">
               			Syndicate Loans Platform
               			</Typography>
               			<Tabs className={classes.tabs}>
			            <Tab label="Home"  to='/' component={NavLink}/>
						{(this.checkUser() === "borrower") ?
			            <Tab label="Initiate Application" to='/application' component={NavLink}/> : null}
		          	</Tabs>

					  <div  id="logout">
					 <ProfilePopper handleToggle = {this.handleToggle}
					 					  handleClose = {this.handleClose}
										  handleLogout = {this.handleLogout}
										  open = {this.state.open} 
										  user = {this.state.user}/>
					  </div>
            		</Toolbar>
            		
        		</AppBar>
        </div>);
	}
}
export default withStyles(styles)(Header);