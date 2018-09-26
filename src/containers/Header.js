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
import Badge from '@material-ui/core/Badge';
import Notifications from '@material-ui/icons/Notifications';
import ProfilePopper from '../presentation/ProfilePopper';
import NotificationPanel from '../presentation/NotificationPanel';
import IconButton from '@material-ui/core/IconButton';
const styles = theme => ({
	tabs: {
		flex: 1
	},
	notification: {

	},
	bellIcon: {
		marginRight: theme.spacing.unit*2,
		paddingTop: theme.spacing.unit*1,
	}
 });
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.authenticedServiceInstance = AuthenticatedServiceInstance;
		this.state = {
			user : {},
			open: false,
			openNot: false,
			pendingLoans: [],
			notLength: this.authenticedServiceInstance.makeNotifications().length
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
	handleTogglePanel = () => {
		this.setState(state => ({ openNot: !state.openNot }));
	}
	handleClose = (event, anchorEl) => {
		if (anchorEl.contains(event.target)) {
		  return;
		}
	
		this.setState({ open: false });
	  };
	  handleClosePanel = (event, anchorEl) => {
		if (anchorEl.contains(event.target)) {
		  return;
		}
	
		this.setState({ openNot: false });
	  };
	  changeNot = () => {
		let arr = this.authenticedServiceInstance.makeNotifications();
		//this.setState({notLength: arr.length});
		return arr;
	  }
	render() {
		// {(this.checkUser() === "borrower") ?
		// <Tab label="Initiate Application" to='/application' component={NavLink}/> : null}
		const { classes } = this.props;
		return (
			 <div >
        		<AppBar position="static" id="headerr">
            		<Toolbar id="header">
                		<Typography id="logoHeading" variant="headline" color="inherit">
               			Syndicate Lending
               			</Typography>
               			<Tabs className={classes.tabs}>
			            <Tab label="Home"  to='/' component={NavLink}/>
						
		          	</Tabs>
					  <NotificationPanel handleToggle = {this.handleTogglePanel}
					 					  handleClose = {this.handleClosePanel}
										  open = {this.state.openNot} 
										 notLength = {this.state.notLength}
										  data = {this.changeNot()}/>
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