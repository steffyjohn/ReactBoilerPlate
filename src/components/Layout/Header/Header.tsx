import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, FormControlLabel, AppBar, Switch, Toolbar, Menu, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './../CommonStyle';
import { getToggleSettings, changeDefaultTheme, resetStore } from './../../../slices/settingSlice';
import { DefaultStore } from './../../../core/model/store.model';

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
    const { isDefaultTheme } = useSelector((state: DefaultStore) => state.settings);
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
        console.log('_name', name);
        if (name === 'Change Password') {
            history.push('/change-password');
        } else {
            dispatch(resetStore({ isReset: true }));
            history.push('/');
        }

        setAnchorEl(null);
    };
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: !props.open,
            })}
            style={{ zIndex: props.open ? 1100 : 1300 }}
        >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: props.open,
                    })}
                >
                    <MenuIcon className={classes.icon} />
                </IconButton>
                <div>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        edge="start"
                        size="medium"
                        onClick={handleClick}
                    >
                        <AccountCircleIcon className={classes.icon} />
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
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                        {/* <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem  onClick={handleClose}>Logout</MenuItem> */}
                    </Menu>
                    <FormControlLabel
                        control={<ToggleSwitch checked={state.isChecked} onChange={handleChange} name="isChecked" />}
                        label=""
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
