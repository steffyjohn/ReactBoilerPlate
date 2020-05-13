import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ToastContainer } from 'react-toastify';
import { useStyles } from './ChangePasswordStyles';
import FormContainer from './../../components/Form/FormContainer';
import { showToast } from './../../core/config/Toast';
import { SUCCESS } from './../../core/config/constants';

function ChangePassword() {
    const classes = useStyles();
    const history = useHistory();
    const [view, setview] = useState<any>(null);
    const [formRegister, setformRegister] = useState({});
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [DataModel, setDataModel] = React.useState([
        {
            fieldType: 'input',
            inputType: 'text',
            name: 'password',
            label: 'Password',
            valid: '["required"]',
            value: null,
            password: true,
        },
        {
            fieldType: 'input',
            inputType: 'text',
            name: 'confirmpassword',
            label: 'Confirm Password',
            valid: '["required","equalto"]',
            dataparam: 'password',
            value: null,
            password: true,
        },
    ]);
    const onNavigate = () => {
        console.log('----h');
        history.push('/');
    };
    useEffect(() => {
        if (passwordChangeSuccess) {
            onNavigate();
        }
    }, [passwordChangeSuccess]);
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
        const { password, confirmpassword } = value;

        if (password && confirmpassword) {
            const toastObj = {
                type: SUCCESS,
                message: `Password changed successfully`,
                oncloseToast: function () {
                    setPasswordChangeSuccess(true);
                },
                cb: true,
            };
            showToast(toastObj);
        }
    };

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <Container component="main" maxWidth="xs" className={classes.color}>
                    <CssBaseline /> <ToastContainer />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Change Password
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
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </div>
                </Container>
            </Grid>
        </div>
    );
}

export default ChangePassword;
