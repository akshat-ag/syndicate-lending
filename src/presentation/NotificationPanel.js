import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import citibank from '../static/images/citibank.png';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
const styles = theme => ({
  root: {
    
  },
  paper: {
    marginRight: theme.spacing.unit * 6,
  },
  Button: {
      color: '#000000',
      paddingTop: 0,
      paddingBottom: 0
  }, avatar: {
    marginRight: 7,
    width: 30,
    height: 30,
    background: "#FC6180"
  },
  popper: {
    marginLeft: -(theme.spacing.unit * 25),
    
  },
  bellIcon: {
    marginRight: theme.spacing.unit*2,
    paddingTop: theme.spacing.unit*0.2,
},
menuItem: {
    fontSize: 16,
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: 1,
    borderColor: '#000000',
    paddingBottom: 4
}

});
{/* <Badge className={classes.notification}  color="primary">	</Badge> */}
function NotificationPanel(props){
   const { classes } = props;
    
 let anchorEl;
    return (
      <div className={classes.root}>
      
        <div>
        <IconButton aria-label="4 pending messages" 
        buttonRef={node => {
              anchorEl = node;
            }}
            aria-owns={props.open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={props.handleToggle}
            className={classes.bellIcon} >
				
          				<Notifications />
				
					</IconButton>
         <Popper id="profilePopper" className={classes.popper} open={props.open} anchorEl={anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={(e) => props.handleClose(e, anchorEl)}>
                    <MenuList>
                    {(props.data.length) ? props.data.map(row => {
                        return (
                      <MenuItem className = {classes.menuItem} onClick={(e) => props.handleClose(e, anchorEl)}>{row}</MenuItem>)
                    }) : null}
                     </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  
}


export default withStyles(styles)(NotificationPanel);
