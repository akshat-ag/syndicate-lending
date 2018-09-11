import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import FormInput from '../containers/FormInput/formInput'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function LoginForm(props) {
    const { classes } = props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormInput
                id="username"
                name="username"
                type="text"
                isRequired
                label="User Name"
                // validations={[props.passwordValidation]}
                // endAdornment="eye"
                // restrictedPattern={/^[0-9*#+]+$/} 
                endAdornment={{ icon: 'account_box' }}
                updateData={props.updateData}
              />
              <FormInput
                id="password"
                name="test-password"
                type="password"
                isRequired
                label="Password"
                validations={[props.passwordValidation]}
                endAdornment="eye"
                // restrictedPattern={/^[0-9*#+]+$/} 
                updateData={props.updateData}
              />
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={props.onSubmit}
                
              >
                Sign in
            </Button>
            
            </form>
            {props.error ? <h5 id="loginerror" >Entered UserName or Password is incorrect </h5> : null}
          </Paper>
        </main>
      </React.Fragment>
    )
  }

export default withStyles(styles)(LoginForm);
