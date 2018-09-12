import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  Button: {
      color: '#ffffff'
  },
  popper: {
    marginLeft: -(theme.spacing.unit * 7),
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
            {props.user.orgName}
          </Button>
          <Popper className={classes.popper} open={props.open} anchorEl={anchorEl} transition disablePortal>
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
