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
    submit = false;
    state: StateProps = {
        error: {},
        formRegister: this.props.formRegister ? this.props.formRegister : {},
    };
    constructor(props) {
        super(props);
        this.props.fields.forEach(element => {
            if (!this.state.formRegister.hasOwnProperty(element.name)) {
                this.state.formRegister = {
                    ...this.state.formRegister,
                    [element.name]: element.value
                        ? element.value
                        : element.fieldType == "select"
                            ? element.default
                            ? element.options[0][element.default]:""
                            : ""
                };
            }
            this.state.error = { ...this.state.error, [element.name]: null };
        });
    }
    componentWillReceiveProps(newProps, prevProps) {
        if (newProps.formRegister !== this.props.formRegister) {
            this.setState({
              formRegister: newProps.formRegister ? newProps.formRegister : {}
            });
          }
        if ( (JSON.stringify(prevProps.fields) != JSON.stringify(newProps.fields)) &&
            !this.submit) {
            newProps.fields&&newProps.fields.forEach(element => {
               
                    this.setState((prevState:any) => ({
                        formRegister: {
                          ...prevState.formRegister,
                          [element.name]: element.value
                          ? element.value
                          : element.fieldType == "select"
                          ? element.options[0][element.default]
                          : element.value
                        }
                      }));
               
              });
          }

    }
    onChange = (data) => (event) => {
        this.submit = true;
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
                    }
                    // else if (key === 'password') {
                    //     errors.push('Password must be atleast 8 characters, uppercase and lowercase letters, numbers and symbols');
                    // }
                    else if (key === 'equalto' && inputName === 'confirmpassword') {
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
                                value={this.state.formRegister[data.name]}
                                inputProps={{
                                    datavalidate: data.valid,
                                    dataparam: data.dataparam ? data.dataparam : '',
                                }}
                                error={this.hasError(data.name)}
                                helperText={this.getErrorMessage(data.name)}
                                type={data.password ? 'password' : 'text'}
                                onChange={this.onChange(data)}
                            />
                        );
                    case 'select':
                        return (
                            <TextField
                                id="standard-select-currency-native"
                                select
                                label={data.label}
                                name={data.name}
                                value={this.state.formRegister[data.name]}
                                fullWidth
                                onChange={this.onChange(data)}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                
                                {data.options &&
                                    data.options.map((options, index) => (
                                        <option
                                            key={options.id ? options.id : index + 1}
                                           
                                        >
                                            {data.default ? options[data.default] : options}
                                        </option>
                                    ))}
                            </TextField>
                        )
                }
            });
        } else {
            return <React.Fragment />;
        }
    }
}

export default FormContainer;
