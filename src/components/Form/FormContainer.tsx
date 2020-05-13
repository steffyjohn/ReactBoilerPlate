import React from 'react';
import { TextField } from '@material-ui/core';
import FormValidator from '../FormValidator/FormValidator';

interface FormContainerProps {
    submit: any;
    cb: Function;
    cb2: Function;
    fields: any;
    formRegister: any;
}
interface StateProps {
    error: any;
    formRegister: any;
}
class FormContainer extends React.Component<FormContainerProps> {
    oldError;
    state: StateProps = {
        error: {},
        formRegister: this.props.formRegister ? this.props.formRegister : {},
    };
    onChange = (data) => (event) => {
        const input = event.target;
        const value = input.value;
        const result = FormValidator.validate(input);
        let errorType: any = null;
        if (Object.values(result).includes(true)) {
            errorType = result;
        }
        this.setState(() => ({
            error: {
                ...this.state.error,
                [input.name]: errorType,
            },
            formRegister: {
                ...this.state.formRegister,
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
        const errors: any = [];
        if (errorList) {
            Object.keys(errorList).forEach((key) => {
                if (errorList[key] === true) {
                    if (key === 'required') {
                        errors.push('Field is required');
                    } else if (key === 'equalto' && inputName === 'confirmpassword') {
                        errors.push('Passwords do not match');
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
                                key={index}
                                variant={data.variant ? data.variant : 'outlined'}
                                margin="normal"
                                fullWidth
                                id={data.name}
                                label={data.label}
                                name={data.name}
                                inputProps={{
                                    datavalidate: data.valid,
                                    dataparam: data.dataparam ? data.dataparam : '',
                                }}
                                error={this.hasError(data.name)}
                                helperText={this.getErrorMessage(data.name)}
                                required
                                type={data.password ? 'password' : 'text'}
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

export default FormContainer;
