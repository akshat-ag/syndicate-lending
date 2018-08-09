import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import TextInput from './textInput';
import PasswordInput from './passwordInput';
const styles = theme => (
    {
        // root: {
        //     display: 'flex',
        //     flexWrap: 'wrap',
        // },
        // margin: {
        //     margin: theme.spacing.unit,
        // },
        // withoutLabel: {
        //     marginTop: theme.spacing.unit * 3,
        // },
        // textField: {
        //     flexBasis: 200,
        // },
        // error: {
        //     color: 'green',
        // }
    });
class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            errorFlag: false
        };
    }

    validator(validations, event, prop) {
        if (validations && validations.length > 0) {
            validations.forEach(validation => {
                let errors = [];
                let errorFlag = false;
                let errorObject = validation(event.target.value);
                if (errorObject.error) {
                    errors.push(validation(event.target.value).errorMsg);
                    errorFlag = validation(event.target.value).error;
                } else {
                    errors = [];
                }
                this.setState({ errors: errors, errorFlag: errorFlag });
            })
        }
        this.setState({ [prop]: event.target.value }, ()=>{
            this.props.updateData(prop, this.state[prop]);
        });
    }

    handleChange = (prop, restrictedPattern, validations) => event => {
        if (restrictedPattern) {
            if (restrictedPattern.test(event.target.value)) {
                this.validator(validations, event, prop);
            }
        }
        else {
            this.validator(validations, event, prop);
        }
    };

    render() {
        const {
            classes,
            id,
            name,
            isRequired,
            label,
            restrictedPattern,
            validations,
            isError,
            endAdornment,
            type
        } = this.props;
        return (
            <div className={classes.root}>
                <FormControl
                    // className={classNames(classes.margin, classes.textField, classes.error)}
                    aria-describedby={`${id}-${name}-field`}
                    required={isRequired}
                    error={this.state.errorFlag}
                    disabled={this.state.disabled}
                >
                    <InputLabel htmlFor={`${id}-${name}-field`}>{label}</InputLabel>
                    {type === "text" ?<TextInput
                        id={id}
                        endAdornment={endAdornment}
                        value={this.state[id] || ''}
                        onChange={this.handleChange(id, restrictedPattern, validations)}
                    /> : ''}
                    {type === "password" ?<PasswordInput
                        id={id}
                        endAdornment={endAdornment}
                        value={this.state[id] || ''}
                        onChange={this.handleChange(id, undefined, undefined)}
                    /> : ''}
                    
                    {this.state.errorFlag ?
                        <FormHelperText id="weight-helper-text">{this.state.errors[0]}</FormHelperText>
                        : ''}
                </FormControl>
            </div>
        );
    }
}

FormInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormInput);
