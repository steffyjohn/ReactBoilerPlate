import React from 'react';
import { Avatar, CssBaseline, Grid, Typography, Container } from '@material-ui/core';
import { useStyles } from './style';
import FormContainer from '../../components/form/formContainer';
import { loginFields } from '../../core/config/formFields';
import { SIGN_IN } from './../../core/config/constants';

interface SignInProps {
    history: any;
}
function SignIn(props: SignInProps) {
    const classes = useStyles();
    const OnCompleteForm = (value) => {
        const { email, password } = value;
        if (email && password) {
            props.history.push('/dashboard');
        }
    };
    return (
        <Grid container component="main" className={classes.root}>
            <Container component="main" maxWidth="xs" className={classes.color}>
                <CssBaseline />

                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <FormContainer
                        fields={loginFields}
                        initialValues={{ email: '', password: '' }}
                        submit={classes.submit}
                        formClass={classes.form}
                        cb={OnCompleteForm}
                        buttonLabel={SIGN_IN}
                        {...props}
                    />
                </div>
            </Container>
        </Grid>
    );
}

export default SignIn;
