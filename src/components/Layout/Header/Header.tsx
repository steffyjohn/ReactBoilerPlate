import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { FormControlLabel } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './../CommonStyle';
import { getToggleSettings, changeDefaultTheme } from './../../../slices/settingSlice';
import { DefaultStore } from './../../../core/model/store.model';

interface HeaderProps {
    open: boolean;
    getToggleSettings: Function;
    changeDefaultTheme: Function;
    isDefaultTheme: any;
}

function Header(props: HeaderProps) {
    const [state, setState] = React.useState({
        isChecked: false,
    });
    const dispatch = useDispatch();
    const { isDefaultTheme } = useSelector((state: DefaultStore) => state.settings);
    const classes = useStyles();
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

                <FormControlLabel
                    control={<ToggleSwitch checked={state.isChecked} onChange={handleChange} name="isChecked" />}
                    label=""
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;
