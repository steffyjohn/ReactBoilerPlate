import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Switch from '@material-ui/core/Switch';
import swal from 'sweetalert';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { DialogContent, DialogContentText, DialogTitle, NativeSelect } from '@material-ui/core';
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
interface UserListingProps {
    layout: { primary?: string };
}

const _initial = { first: '', email: '', last: '', Role: 'Admin' };
const columns = [
    { title: 'Name', field: 'first' },
    { title: 'Surname', field: 'last' },
    { title: 'Email', field: 'email' },
];
const RoleColoumn = [{ title: 'Role', field: 'Role' }];
function UserListingComponent(props: UserListingProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [isNewUser, setIsNewUser] = React.useState(true);
    const [list, setList] = React.useState(_initial);
    const [isAdminUser, setIsAdminUser] = React.useState(true);

    const [state, setState] = React.useState<TableState>({
        columns: isAdminUser ? [...columns, ...RoleColoumn] : [...columns],
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
    const handleChange = (e, row) => {
        console.log('e2', row);
        // console.log("hii",e.target.checked)
    };
    const handleSelectChange = (e) => {
        const name = e.target.value;
        name === 'Application Users' ? setIsAdminUser(false) : setIsAdminUser(true);
        setState({ ...state, columns: !isAdminUser ? [...columns, ...RoleColoumn] : [...columns] });
    };
    return (
        <UserWrapper>
            <CardHeader
                title="User"
                permssion={isAdminUser ? true : false}
                onClick={() => {
                    setOpen(true);
                    setIsNewUser(true);
                    setList(_initial);
                }}
            />
            <ToastContainer />

            <div className={classes.table}>
                <div className={classes.select}>
                    {' '}
                    <label>Filter By:</label>{' '}
                    <NativeSelect
                        // className={classes.table}
                        onChange={handleSelectChange}
                        name="users"
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="System Users">System Users</option>
                        <option value="Application Users">Application Users</option>
                    </NativeSelect>
                </div>
                <MaterialTable
                    title=""
                    columns={state.columns}
                    data={state.data}
                    actions={
                        isAdminUser
                            ? [
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
                              ]
                            : [
                                  // {
                                  //     icon:()=> <Switch   name="isChecked" />,
                                  //     tooltip: 'Suspend User',
                                  //     onClick: (e,rowData)=>handleChange(e,rowData),
                                  // },
                              ]
                    }
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

const mapStateToProps = (state) => {
    return {
        layout: state.settings.layout,
    };
};
UserListingComponent.displayName = 'UserListingComponent';

export default connect(mapStateToProps, null)(UserListingComponent);
