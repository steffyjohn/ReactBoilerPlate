import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { validate } from './../../utils/formValidators/component';
import { CANCEL } from './../../core/config/constants';

export default function FormContainer(props: any) {
    const textFieldStyle = { minHeight: '5rem' };
    const [initialValues, setInitialValues] = useState(props.initialValues);
    useEffect(() => {
        setInitialValues(props.initialValues);
    }, [props.initialValues]);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                props.cb(values);
            }}
            validationSchema={validate(initialValues)}
        >
            {({ values, touched, errors, handleChange, handleBlur, handleSubmit, resetForm }) => {
                if (props.fields.length) {
                    return (
                        <form className={props.formClass} onSubmit={handleSubmit}>
                            {props.fields.map((data, index) => {
                                switch (data.fieldType) {
                                    case 'input':
                                        return (
                                            <div key={index + 1} className="form-control">
                                                <TextField
                                                    value={values[data.name] || ''}
                                                    error={Boolean(touched[data.name] && errors[data.name])}
                                                    fullWidth={true}
                                                    variant="outlined"
                                                    id={data.name}
                                                    type={data.type ? data.type : 'text'}
                                                    placeholder={data.placeholder}
                                                    label={data.label}
                                                    helperText={
                                                        touched[data.name] && errors[data.name] ? errors[data.name] : ''
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={textFieldStyle}
                                                />
                                            </div>
                                        );
                                    case 'select':
                                        return (
                                            <TextField
                                                key={index + 1}
                                                id="standard-select-currency-native"
                                                select
                                                error={Boolean(touched[data.name] && errors[data.name])}
                                                value={values[data.name] || 'Admin'}
                                                label={data.label}
                                                name={data.name}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                helperText={
                                                    touched[data.name] && errors[data.name] ? errors[data.name] : ''
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                style={textFieldStyle}
                                            >
                                                {data.options &&
                                                    data.options.map((options, index) => (
                                                        <option
                                                            value={options.value}
                                                            key={options.id ? options.id : index + 1}
                                                        >
                                                            {options[data.default]}
                                                        </option>
                                                    ))}
                                            </TextField>
                                        );
                                }
                            })}

                            <div className="flexDisplay">
                                {props.isCancel && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={props.cancel ? props.cancel : ''}
                                        size={'large'}
                                        onClick={() => props.onClose()}
                                    >
                                        {CANCEL}
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={props.submit ? props.submit : ''}
                                    size={'large'}
                                >
                                    {props.buttonLabel}
                                </Button>
                            </div>
                        </form>
                    );
                }
                return <React.Fragment></React.Fragment>;
            }}
        </Formik>
    );
}
