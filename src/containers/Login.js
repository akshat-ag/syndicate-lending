import React, { Component } from 'react';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';
import {Redirect} from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.authenticedServiceInstance = AuthenticatedServiceInstance;
        this.state = {
            redirectToReferrer: false
        };
    }
    componentDidMount() {                
    }
    handleClick(e) {
        this.authenticedServiceInstance.authenticate();
        console.log("User now logged in.." + AuthenticatedServiceInstance.isLoggedIn());
        this.setState({
            redirectToReferrer: true
        });
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
            <div id="login-page">
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={(e) => (this.handleClick(e))}>Log in</button>
            </div>
        );
    }
}

export default Login;