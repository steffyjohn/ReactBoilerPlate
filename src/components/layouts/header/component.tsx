import React from 'react';
import clsx from 'clsx';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, FormControlLabel, AppBar, Switch, Toolbar, Menu, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../commonStyle';
import { getToggleSettings, changeDefaultTheme, resetStore } from '../../../slices/settingSlice';
import { DefaultStore } from '../../../core/Interface/store.interface';
import { LOGOUT_CONFIRMATION, WARNING } from '../../../core/config/constants';

interface HeaderProps {
    open: boolean;
    getToggleSettings: Function;
    changeDefaultTheme: Function;
    isDefaultTheme: any;
}
const items = [
    { name: 'Change Password', label: 'Change Password' },
    { name: 'Log Out', label: 'Log Out' },
];
function Header(props: HeaderProps) {
    const [state, setState] = React.useState({
        isChecked: false,
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const { isDefaultTheme, open, layout } = useSelector((state: DefaultStore) => state.settings);
    const classes = useStyles();
    const history = useHistory();
    const ToggleSwitch = withStyles({
        switchBase: {
            '&$checked + $track': {
                backgroundColor: isDefaultTheme ? '#01579B' : '#004D40',
            },
        },
        checked: {},
        track: {},
    })(Switch);
    const handleDrawerOpen = () => {
        dispatch(getToggleSettings({ open: true }));
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDefaultTheme({ isDefaultTheme: event.target.checked }));
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (name) => {
        if (name === 'Change Password') {
            history.push('/change-password');
        } else {
            swal({
                text: LOGOUT_CONFIRMATION,
                icon: WARNING,

                buttons: {
                    cancel: {
                        text: 'Cancel',
                        value: null,
                        visible: true,
                        closeModal: true,
                    },
                    confirm: {
                        className: layout.primary,
                    },
                },
            }).then((isLogOut) => {
                if (isLogOut) {
                    dispatch(resetStore({ isReset: true }));
                    history.push('/');
                }
            });
        }

        setAnchorEl(null);
    };
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: !open,
            })}
            style={{ zIndex: open ? 1100 : 1300 }}
        >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <div>
                    <FormControlLabel
                        control={<ToggleSwitch checked={state.isChecked} onChange={handleChange} name="isChecked" />}
                        label=""
                    />
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        edge="start"
                        size="medium"
                        onClick={handleClick}
                    >
                        <AccountCircleIcon className={classes.icon} style={{ fontSize: 35 }} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {items &&
                            items.map((list, index) => {
                                return (
                                    <MenuItem key={index + 1} onClick={() => handleClose(list.name)}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
