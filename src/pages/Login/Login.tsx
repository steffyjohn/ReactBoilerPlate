import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './LoginStyles';
import { SIGN_IN, FORGOT_PASSWORD } from './../../core/config/constants';
import validator from 'validator';

export default function Login() {
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
            setEmailError('Please provide a valid Email');
        }
        if (!password) {
            setpasswordError(true);
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
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {SIGN_IN}
                    </Typography>
                    <form className={classes.form} onSubmit={onSubmit} noValidate>
                        <TextField
                            error={isEmailError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={isEmailError ? emailError : ''}
                            autoFocus
                            onChange={onChange}
                        />

                        <TextField
                            variant="outlined"
                            error={passwordError}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={onChange}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {SIGN_IN}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {FORGOT_PASSWORD}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}></Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
