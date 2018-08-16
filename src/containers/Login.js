import React, { Component } from 'react';
import { AuthenticatedServiceInstance } from '../services/AuthenticationService';
import { Redirect } from 'react-router-dom';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateData = this.updateData.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }
    handleSubmit(e) {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.authenticedServiceInstance.authenticate();
            console.log("User now logged in.." + AuthenticatedServiceInstance.isLoggedIn());
            this.setState({
                redirectToReferrer: true
            });
            e.preventDefault();
        }
    }

    updateData(key, value) {
        this.setState({ [key]: value }, () => {
        });
    }
    passwordValidation(value) {
        if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).test(value)) {
            return {
                error: true,
                errorMsg: 'Password Should be a minimum of eight characters, at least one uppercase letter,' +
                    'one lowercase letter, one number and one special character:'
            }
        }
        return {
            error: false,
            errorMsg: ''
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            console.dir(from);
            return (
                <Redirect to={from}
                />
            )
        }
        return (
            <LoginForm updateData={this.updateData}
                onSubmit={this.handleSubmit}
                passwordValidation={this.passwordValidation} 
                />
        );
    }
}

export default Login;