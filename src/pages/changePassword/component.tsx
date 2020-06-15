import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles, ChangePasswordWrapper } from './style';
import FormContainer from '../../components/form/formContainer';
import { showToast } from '../../utils/utilities';
import { SUCCESS } from '../../core/config/constants';
import { passwordFields } from '../../core/config/formFields';

function ChangePassword(props: any) {
    const classes = useStyles();
    const history = useHistory();
    const [view, setview] = useState<any>(null);
    const onNavigate = () => {
        history.push('/');
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
        <ChangePasswordWrapper>
            <Grid container component="main" className={classes.root}>
                <Container component="main" maxWidth="xs" className={classes.color}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Change Password
                        </Typography>
                        <FormContainer
                            fields={passwordFields}
                            initialValues={{ password: '', confirmpassword: '' }}
                            submit={classes.submit}
                            formClass={classes.form}
                            cb={OnCompleteForm}
                            buttonLabel={'Confirm'}
                            {...props}
                        />
                    </div>
                </Container>
            </Grid>
        </ChangePasswordWrapper>
    );
}

export default ChangePassword;
