import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    adornment = (adornment, position) => {
        return <InputAdornment position={position}>
            {adornment.label}
            {adornment.icon && <Icon className={adornment.iconClass}>
                {adornment.icon}
            </Icon>}
        </InputAdornment>
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };


    render() {
        const { classes, endAdornment, startAdornment, id, ...props } = this.props;
        return <Input
            id={id}
            type={this.state.showPassword ? 'text' : 'password'}
            startAdornment={startAdornment && this.adornment(startAdornment, 'start')}
            {...props}
            endAdornment={endAdornment &&
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                    >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    }
}

PasswordInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default PasswordInput;
