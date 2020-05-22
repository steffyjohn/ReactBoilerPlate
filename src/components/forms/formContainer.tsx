import React, { useEffect, useReducer } from 'react';
import { TextField } from '@material-ui/core';
import FormValidator from '../../utils/formValidator/component';

interface FormContainerProps {
    submit: any;
    cb: Function;
    cb2: Function;
    fields: any;
    formRegister: any;
}
interface StateProps {
    error: any;
}
function FormContainer(props: FormContainerProps) {
    let oldError: any;
    let submit: any = false;

    const reducer = (prevState, updatedProperty) => ({
        ...prevState,
        ...updatedProperty,
    });
    const initState: StateProps = {
        error: {},
    };

    const [state, setState] = useReducer(reducer, initState);
    const [formRegister, setformRegister] = useReducer(reducer, {});

    useEffect(() => {
        if (!submit) {
            props.fields &&
                props.fields.forEach((element) => {
                    setformRegister({
                        [element.name]: element.value
                            ? element.value
                            : element.fieldType == 'select'
                            ? element.options[0][element.default]
                            : element.value,
                    });
                });
        }
    }, [props.fields]);
    useEffect(() => {
        if (props.submit) {
            const { errors, hasError } = FormValidator.bulkValidate(props.submit);
            let payload = formRegister;
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
        submit = true;
        const input = event.target;
        const value = input.value;

        setState({
            error: {
                ...state.error,
                [input.name]: null,
            },
        });
        setformRegister({ [input.name]: value });
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
    const onBlur = (data) => (event) => {
        const result = FormValidator.validate(event.target);
        let errorType: any = null;
        if (Object.values(result).includes(true)) {
            errorType = result;
        }
        setState({
            error: {
                ...state.error,
                [event.target.name]: errorType,
            },
        });
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
                            value={formRegister[data.name] || ''}
                            inputProps={{
                                datavalidate: data.valid,
                                dataparam: data.dataparam ? data.dataparam : '',
                            }}
                            // InputLabelProps={{
                            //     shrink: data.shrink? true:false,
                            //   }}
                            placeholder={data.placeholder ? data.placeholder : ''}
                            onBlur={onBlur(data)}
                            error={hasError(data.name)}
                            helperText={getErrorMessage(data.name)}
                            type={data.password ? 'password' : 'text'}
                            onChange={onChange(data)}
                        />
                    );
                case 'select':
                    return (
                        <TextField
                            id="standard-select-currency-native"
                            select
                            key={index}
                            label={data.label}
                            name={data.name}
                            value={formRegister[data.name] || ''}
                            fullWidth
                            onChange={onChange(data)}
                            onBlur={onBlur(data)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {data.options &&
                                data.options.map((options, index) => (
                                    <option key={options.id ? options.id : index + 1}>
                                        {data.default ? options[data.default] : options}
                                    </option>
                                ))}
                        </TextField>
                    );
            }
        });
    } else {
        return <React.Fragment />;
    }
}

export default FormContainer;
