import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { FormControlLabel } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './../CommonStyle';
import { getToggleSettings, changeDefaultTheme } from './../../../slices/settingSlice';

interface HeaderProps {
    open: boolean;
    getToggleSettings: Function;
    changeDefaultTheme: Function;
    theme: any;
}

function Header(props: HeaderProps) {
    const [state, setState] = React.useState({
        isChecked: false,
    });

    const classes = useStyles();
    const ToggleSwitch = withStyles({
        switchBase: {
            '&$checked + $track': {
                backgroundColor: props.theme ? '#01579B' : '#004D40',
            },
        },
        checked: {},
        track: {},
    })(Switch);
    const handleDrawerOpen = () => {
        props.getToggleSettings({ open: true });
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeDefaultTheme({ isDefaultTheme: event.target.checked });
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

const mapDispatchToProps = (dispatch) => ({
    getToggleSettings: (payload) => dispatch(getToggleSettings(payload)),
    changeDefaultTheme: (payload) => dispatch(changeDefaultTheme(payload)),
});

export default connect(null, mapDispatchToProps)(Header);
