import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, Grid, Typography, Container } from '@material-ui/core';
import { useStyles } from './style';
import FormContainer from '../../components/form/formContainer';
import { loginFields } from '../../core/config/formFields';

interface SignInProps {
    history: any;
}
function SignIn(props: SignInProps) {
    const classes = useStyles();
    const [view, setview] = useState<any>(null);
    const [formRegister, setformRegister] = useState({});
    const [DataModel, setDataModel] = useState(loginFields);
    const formSubmit = (e) => {
        const form = e.target;
        const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT'].includes(i.nodeName));
        return inputs;
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const inputs = formSubmit(e);
        setview(inputs);
    };
    const OnCompleteForm = (value) => {
        const { email, password } = value;
        setview(null);
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

                    <form className={classes.form} noValidate onSubmit={onSubmitForm}>
                        <FormContainer
                            fields={DataModel}
                            submit={view}
                            cb={OnCompleteForm}
                            cb2={() => setview(null)}
                            formRegister={formRegister}
                        />

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                size={'large'}
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </Grid>
    );
}

export default SignIn;
