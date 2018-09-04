import React from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'
import {NavLink} from 'react-router-dom'
export default class Header extends React.Component {
	render() {
		return (
			 <div >
        		<AppBar position="static">
            		<Toolbar id="header">
                		<Typography variant="title" color="inherit">
               			Syndicate Loans Platform
               			</Typography>
               			<Tabs >
			            <Tab label="Home"  to='/' component={NavLink}/>
			            <Tab label="Initiate Application" to='/application' component={NavLink}/>
		          	</Tabs>
            		</Toolbar>
            		
        		</AppBar>
        </div>);
	}
}