import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useStyles, UserWrapper } from '../style';
import FormContainer from '../../../components/form/formContainer';
import { userFields } from '../../../core/config/formFields';

interface AddUserProps {
    list: { email?: string; first?: string; last?: string; Role?: string };
    isNewUser?: boolean;
    onRowAdd: Function;
    onRowEdit: Function;
    onClose: Function;
}

function AddUser(props: AddUserProps) {
    const classes = useStyles();
    const [view, setview] = useState<any>(null);
    const [formRegister, setformRegister] = useState({});
    const [DataModel, setDataModel] = useState(userFields);
    useEffect(() => {
        if (!props.isNewUser) {
            DataModel.forEach((element) => {
                element.value = props.list[element.name];
                setDataModel([...DataModel]);
            });
        } else {
            DataModel.forEach((element) => {
                element.value = '';
                setDataModel([...DataModel]);
            });
        }
    }, []);

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
        setview(null);
        props.isNewUser ? props.onRowAdd(value) : props.onRowEdit(value, props.list);
        props.onClose();
    };
    return (
        <UserWrapper>
            <form onSubmit={onSubmitForm}>
                <FormContainer
                    fields={DataModel}
                    submit={view}
                    cb={OnCompleteForm}
                    cb2={() => setview(null)}
                    formRegister={formRegister}
                />

                <div className="flexDisplay">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.cancel}
                        size={'large'}
                        onClick={() => props.onClose()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" className={classes.submit} size={'large'}>
                        Save
                    </Button>
                </div>
            </form>
        </UserWrapper>
    );
}

export default AddUser;
