import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import {Redirect} from 'react-router-dom';
import LoginForm from '../presentation/LoginForm';

class Login extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
        this.state = {
            redirectToReferrer: false,
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      if (this.state.username.length > 0 && this.state.password.length > 0){
        this.authenticedServiceInstance.authenticate();
        console.log("User now logged in.." + AuthenticatedServiceInstance.isLoggedIn());
        this.setState({
            redirectToReferrer: true
        });
        e.preventDefault();
      }    
    }
    handleChange(e) {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      this.setState({
        [name]: value
      });
      console.log(this.state.username);
      console.log(this.state.password);
    }
    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;        
        if (redirectToReferrer) {
            console.dir(from);
            return (
                <Redirect to={from}
                />
            )
        }
        return (
          <LoginForm onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        );
    }
}

export default Login;