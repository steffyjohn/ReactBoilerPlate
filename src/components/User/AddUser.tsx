import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';
import { useStyles, UserWrapper } from './Userstyles';
import { UserError } from '../../core/model/error.model';
import { FIELD_REQUIRED, EMAIL_VALIDATION_ERROR } from './../../core/config/constants';

function AddUser(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(props.list);
    const [errors, setErrors] = useState<UserError>({ isEmail: false, isfirst: false });

    const onSubmit = (e) => {
        e.preventDefault();
        const error: UserError = {};
        const { email, first } = state;
        if (!email) {
            error.isEmail = true;
            error.email = FIELD_REQUIRED;
        } else if (!validator.isEmail(state.email)) {
            error.email = EMAIL_VALIDATION_ERROR;
            error.isEmail = true;
        }
        if (!first) {
            error.isfirst = true;
            error.first = FIELD_REQUIRED;
        }
        setErrors(error);
        if (!Object.keys(error).length) {
            props.isNewUser ? props.onRowAdd(state) : props.onRowEdit(state, props.list);
            props.onClose();
        }
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        const { email, first } = state;

        if (email) {
            if (errors.isEmail) {
                errors.email = '';
                errors.isEmail = false;
            }
        } else if (first) {
            if (errors.isfirst) {
                errors.isfirst = false;
                errors.first = '';
            }
        }
        setErrors(errors);
        setState({ ...state, [name]: value });
        console.log('sttae', state);
    };
    const Roles = [
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
    ];
    return (
        <UserWrapper>
            <form noValidate onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="first"
                    label="First Name"
                    name="first"
                    autoFocus
                    error={errors.isfirst}
                    helperText={errors.first ? errors.first : ''}
                    value={state.first}
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="last"
                    label="Last Name"
                    name="last"
                    value={state.last}
                    onChange={onChange}
                />
                <div className="marginChange">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={errors.isEmail}
                        helperText={errors.email ? errors.email : ''}
                        value={state.email}
                        onChange={onChange}
                    />
                </div>
                <TextField
                    id="standard-select-currency-native"
                    select
                    label="Role"
                    name="Role"
                    defaultValue={state.Role}
                    fullWidth
                    onChange={onChange}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {Roles.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>

                <div className="flexDisplay">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
AddUser.propTypes = {
    list: PropTypes.object,
    isNewUser: PropTypes.bool,
    onRowAdd: PropTypes.func,
    onRowEdit: PropTypes.func,
    onClose: PropTypes.func,
};
export default AddUser;
