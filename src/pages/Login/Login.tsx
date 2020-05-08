import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './LoginStyles';
import { EMAIL_VALIDATION_ERROR } from './../../core/config/constants';

interface SignInProps {
    history: any;
}
function SignIn(props: SignInProps) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setpasswordError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setIsEmailError(true);
        } else if (!validator.isEmail(email)) {
            setIsEmailError(true);
            setEmailError(EMAIL_VALIDATION_ERROR);
        }
        if (!password) {
            setpasswordError(true);
        }
        if (email && password) {
            props.history.push('/dashboard');
        }
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name == 'email') {
            setEmail(value);
            if (isEmailError) {
                setIsEmailError(false);
            }
        } else if (name == 'password') {
            setPassword(value);
            if (passwordError) {
                setpasswordError(false);
            }
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

                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={isEmailError}
                            helperText={isEmailError ? emailError : ''}
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            onChange={onChange}
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
