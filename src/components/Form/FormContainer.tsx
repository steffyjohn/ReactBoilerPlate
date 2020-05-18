import React, { useEffect, useReducer } from 'react';
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
function FormContainer(props: FormContainerProps) {
    let oldError: any;

    const reducer = (prevState, updatedProperty) => ({
        ...prevState,
        ...updatedProperty,
    });
    const initState: StateProps = {
        error: {},
        formRegister: props.formRegister ? props.formRegister : {},
    };
    const [state, setState] = useReducer(reducer, initState);

    useEffect(() => {
        if (props.submit) {
            const { errors, hasError } = FormValidator.bulkValidate(props.submit);
            let payload = state.formRegister;
            if (hasError) {
                props.cb2();
                if (oldError != JSON.stringify(errors)) {
                    oldError = JSON.stringify(errors);
                    payload = null;
                    const truthyItems = Object.keys(errors).forEach((fields) => {
                        Object.keys(errors[fields]).forEach((key) => {
                            if (errors[fields][key]) {
                                setState({
                                    error: errors,
                                });
                            }
                        });
                    });
                }
            } else {
                props.cb(payload);
            }
        }
    }, [props.submit]);
    const onChange = (data) => (event) => {
        const input = event.target;
        const value = input.value;
        const result = FormValidator.validate(input);
        let errorType: any = null;
        if (Object.values(result).includes(true)) {
            errorType = result;
        }
        setState({
            error: {
                ...state.error,
                [input.name]: errorType,
            },
            formRegister: {
                ...state.formRegister,
                [input.name]: value,
            },
        });
    };
    const hasError = (inputName) => {
        const errorList = state.error[inputName];
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
    const getErrorMessage = (inputName) => {
        const errorList = state.error[inputName];
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

    if (props.fields.length) {
        return props.fields.map((data, index) => {
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
                            error={hasError(data.name)}
                            helperText={getErrorMessage(data.name)}
                            required
                            type={data.password ? 'password' : 'text'}
                            onChange={onChange(data)}
                        />
                    );
            }
        });
    } else {
        return <React.Fragment />;
    }
}

export default FormContainer;
