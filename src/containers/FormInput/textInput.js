import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';


class TextInput extends React.Component {

    adornment(adornment, position) {
        return <InputAdornment position={position}>
            {adornment.label}
            {adornment.icon && <Icon className={adornment.iconClass}>
                {adornment.icon}
            </Icon>}
        </InputAdornment>
    }


    render() {
        const { classes, endAdornment, startAdornment, id, ...props } = this.props;
        return <Input
            id={id}
            type='text'
            endAdornment={endAdornment && this.adornment(endAdornment, 'end')}
            startAdornment={startAdornment && this.adornment(startAdornment, 'start')}
            {...props}
        />
    }
}

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default TextInput;
