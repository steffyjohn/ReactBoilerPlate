import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useStyles, UserWrapper } from './Userstyles';
import FormContainer from './../../components/Form/FormContainer';

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
    const [DataModel, setDataModel] = useState([
        {
            fieldType: 'input',
            inputType: 'text',
            label: 'First Name',
            name: 'first',
            valid: '["required"]',
            value: undefined,
        },
        {
            fieldType: 'input',
            inputType: 'text',
            label: 'Last Name',
            name: 'last',
            valid: '["required"]',
            value: undefined,
        },

        {
            fieldType: 'input',
            inputType: 'text',
            name: 'email',
            label: 'Email',
            valid: '["required","email"]',
            value: undefined,
        },
        {
            fieldType: 'select',
            inputType: 'text',
            name: 'Role',
            label: 'Role',
            options: [
                {
                    value: 'Admin',
                    label: 'Admin',
                },
                {
                    value: 'Manager',
                    label: 'Manager',
                },
                {
                    value: 'Executives',
                    label: 'Executives',
                },
            ],
            default: 'label',
            value: undefined,
        },
    ]);
    useEffect(() => {
        if (!props.isNewUser) {
            DataModel.forEach((element) => {
                element.value = props.list[element.name];

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
