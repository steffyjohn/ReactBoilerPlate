import React from 'react';
import { useStyles, UserWrapper } from '../style';
import FormContainer from '../../../components/form/formContainer';
import { userFields } from '../../../core/config/formFields';
import { SAVE_BTN } from './../../../core/config/constants';

interface AddUserProps {
    list: { email: string; first: string; last: string; Role: string; tableData?: any };
    isNewUser?: boolean;
    onRowAdd: Function;
    onRowEdit: Function;
    onClose: Function;
}

function AddUser(props: AddUserProps) {
    const classes = useStyles();
    const OnCompleteForm = (value) => {
        props.isNewUser ? props.onRowAdd(value) : props.onRowEdit(value, props.list);
        props.onClose();
    };

    const { email, first, last, Role } = props.list;

    return (
        <UserWrapper>
            <FormContainer
                fields={userFields}
                initialValues={{ email, first, last, Role }}
                buttonClass={classes.submit}
                cb={OnCompleteForm}
                buttonLabel={SAVE_BTN}
                cancel={classes.cancel}
                isCancel={true}
                {...props}
            />
        </UserWrapper>
    );
}

export default AddUser;
