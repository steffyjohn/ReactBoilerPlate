import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './style';
import FormContainer from '../../components/form/formContainer';
import { showToast } from '../../utils/utilities';
import { SUCCESS } from '../../core/config/constants';

function ChangePassword() {
    const classes = useStyles();
    const history = useHistory();
    const [view, setview] = useState<any>(null);
    const [formRegister, setformRegister] = useState({});
    const [DataModel, setDataModel] = React.useState([
        {
            fieldType: 'input',
            inputType: 'text',
            name: 'password',
            label: 'Password',
            valid: '["required"]',
            value: undefined,
            password: true,
        },
        {
            fieldType: 'input',
            inputType: 'text',
            name: 'confirmpassword',
            label: 'Confirm Password',
            valid: '["required","equalto"]',
            dataparam: 'password',
            value: undefined,
            password: true,
        },
    ]);
    const onNavigate = () => {
        history.push('/');
    };

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
                    onNavigate();
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
                    <CssBaseline />
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
