import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="footer">
				<AppBar position="static">
		            <Toolbar>
		            	<Grid container item justify="center" xs={12}>
			                <Typography variant="title" color="inherit">
			                @ Copyright 2018
		                	</Typography>
		                </Grid>
		            </Toolbar>
		        </AppBar>
			</div>);
	}
}