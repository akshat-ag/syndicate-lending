import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthenticatedServiceInstance} from '../services/AuthenticationService';

export const AuthenticatedRoute = ({component: Component, ...rest}) => (
    <Route 
    {...rest} 
    render = { props => (
        AuthenticatedServiceInstance.isLoggedIn() ?
    (<Component {...props}/>) : (<Redirect 
                                                to={ {
                                                    pathname: "/login", 
                                                    state: {from: props.location}
                                                }}
                                            />)    
                                            
                                        )
                                    }
    />
);