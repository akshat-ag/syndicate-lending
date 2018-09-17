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
const styles = theme => ({
  root: {
    
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
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
    marginLeft: -(theme.spacing.unit * 0),
  }
});

function ProfilePopper(props){
   const { classes } = props;
    
 let anchorEl;
    return (
      <div className={classes.root}>
      
        <div>
        
          <Button
            buttonRef={node => {
              anchorEl = node;
            }}
            aria-owns={props.open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={props.handleToggle}
            className={classes.Button}
          >
          <Avatar className={classes.avatar} ><Person /> </Avatar>
            {props.user.orgName}
          </Button>

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
                      <MenuItem onClick={(e) => props.handleClose(e, anchorEl)}>{props.user.name}</MenuItem>
                      <MenuItem onClick={(e) => props.handleLogout(e, anchorEl)}>Logout</MenuItem>
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


export default withStyles(styles)(ProfilePopper);
