import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import FormValidator from '../FormValidator/FormValidator';

class FormContainer extends React.Component {
    oldError;
    state = {
        error: {},
        formRegister: this.props.formRegister ? this.props.formRegister : {},
    };
    onChange = (data) => (event) => {
        const input = event.target;
        const value = input.value;
        const result = FormValidator.validate(input);
        let errorType = null;
        if (Object.values(result).includes(true)) {
            errorType = result;
        }
        this.setState((prevState) => ({
            error: {
                ...prevState.error,
                [input.name]: errorType,
            },
            formRegister: {
                ...prevState.formRegister,
                [input.name]: value,
            },
        }));
    };
    hasError = (inputName) => {
        const errorList = this.state.error[inputName];
        let errors;
        if (errorList) {
            Object.keys(errorList).forEach((key) => {
                if (errorList[key] === true) {
                    errors = true;
                }
            });
        } else {
            errors = false;
        }

        return errors;
    };
    getErrorMessage = (inputName) => {
        const errorList = this.state.error[inputName];
        const errors = [];
        if (errorList) {
            Object.keys(errorList).forEach((key) => {
                if (errorList[key] === true) {
                    if (key === 'required') {
                        errors.push(`Field is required`);
                    } else {
                        errors.push(`Field should be  a valid ${key}`);
                    }
                }
            });
        }
        return (
            errors &&
            errors.map((err, index) => {
                return (
                    <React.Fragment key={`${err}-${index}`}>
                        {err}
                        <br />
                    </React.Fragment>
                );
            })
        );
    };
    componentDidUpdate() {
        if (this.props.submit) {
            console.log('000', this.props.submit);
            const { errors, hasError } = FormValidator.bulkValidate(this.props.submit);
            let payload = this.state.formRegister;
            if (hasError) {
                this.props.cb2();
                if (this.oldError != JSON.stringify(errors)) {
                    this.oldError = JSON.stringify(errors);
                    payload = null;
                    const truthyItems = Object.keys(errors).forEach((fields) => {
                        Object.keys(errors[fields]).forEach((key) => {
                            if (errors[fields][key]) {
                                this.setState((prevState) => ({
                                    valid: {
                                        ...prevState.valid,
                                        [fields]: true,
                                    },
                                    error: errors,
                                }));
                            }
                        });
                    });
                }
            } else {
                this.props.cb(payload);
            }
        }
    }
    render() {
        if (this.props.fields.length) {
            return this.props.fields.map((data, index) => {
                switch (data.fieldType) {
                    case 'input':
                        return (
                            <TextField
                                variant={data.variant ? data.variant : 'outlined'}
                                margin="normal"
                                fullWidth
                                id={data.name}
                                label={data.label}
                                name={data.name}
                                inputProps={{ datavalidate: data.valid }}
                                autoFocus
                                error={this.hasError(data.name)}
                                helperText={this.getErrorMessage(data.name)}
                                // error={errors.isfirst}
                                // helperText={errors.first ? errors.first : ''}
                                // value={state.first}

                                onChange={this.onChange(data)}
                            />
                        );
                }
            });
        } else {
            return <React.Fragment />;
        }
    }
}
FormContainer.propTypes = {
    formRegister: PropTypes.object,
    data: PropTypes.array,
    submit: PropTypes.any,
    cb2: PropTypes.func,
    cb: PropTypes.func,
    fields: PropTypes.array,
};
export default FormContainer;
