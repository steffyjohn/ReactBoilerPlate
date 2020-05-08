import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CardHeader from './../../core/config/CardHeader/CardHeader';
import { useStyles, UserWrapper } from './Userstyles';
import AddUser from './AddUser';
import { showToast } from './../../core/config/Toast';
import { SUCCESS, DELETE_CONFIRMATION, WARNING } from './../../core/config/constants';

interface Row {
    first: string;
    last: string;
    Role: string;
    email: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}
const _initial = { first: '', email: '', last: '', Role: 'Admin' };
function UserListingComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [isNewUser, setIsNewUser] = React.useState(true);
    const [list, setList] = React.useState(_initial);

    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Name', field: 'first' },
            { title: 'Surname', field: 'last' },
            { title: 'Email', field: 'email' },
            { title: 'Role', field: 'Role' },
        ],
        data: [
            { first: 'Steffy', last: 'John', Role: 'Manager', email: 'abc@gmal.com' },
            {
                first: 'Zerya Betül',
                last: 'Baran',
                Role: 'Executives',
                email: 'xyz@gmal.com',
            },
        ],
    });
    const deleteUser = (e, rowData) => {
        swal({
            text: DELETE_CONFIRMATION,
            icon: WARNING,
            buttons: {
                confirm: {
                    className: props.layout.primary,
                },
            },
        }).then((willDelete) => {
            if (willDelete) {
                setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(rowData), 1);
                    return { ...prevState, data };
                });
            }
            const toastObj = { type: SUCCESS, message: `User deleted successfully` };
            showToast(toastObj);
        });
    };
    const onEditUser = (e, rowData) => {
        setList(rowData);
        setOpen(true);
        setIsNewUser(false);
    };
    const onRowEdit = (newData, oldData) => {
        setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
        });
    };
    const onRowAdd = (newData) => {
        setState((prevState) => {
            const data = [...prevState.data];
            data.push(newData);
            return { ...prevState, data };
        });
    };
    return (
        <UserWrapper>
            <CardHeader
                title="User"
                permssion={true}
                onClick={() => {
                    setOpen(true);
                    setIsNewUser(true);
                    setList(_initial);
                }}
            />
            <ToastContainer />
            <div className={classes.table}>
                <MaterialTable
                    title=""
                    columns={state.columns}
                    data={state.data}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: onEditUser,
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: deleteUser,
                        },
                    ]}
                />
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{isNewUser ? 'Add User' : 'Edit User'}</DialogTitle>
                    <DialogContent style={{ paddingBottom: '0' }} dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <AddUser
                                onClose={() => setOpen(false)}
                                isNewUser={isNewUser}
                                onRowAdd={onRowAdd}
                                list={list}
                                onRowEdit={onRowEdit}
                                {...props}
                            />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </UserWrapper>
    );
}
UserListingComponent.propTypes = {
    layout: PropTypes.object,
};
const mapStateToProps = (state) => {
    return {
        layout: state.settings.layout,
    };
};
export default connect(mapStateToProps, null)(UserListingComponent);
