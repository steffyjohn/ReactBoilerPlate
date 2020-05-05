import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { useStyles } from './../CommonStyle';
import { getToggleSettings } from './../../../slices/settingSlice';

function Header(props) {
    const classes = useStyles();

    const handleDrawerOpen = () => {
        props.getToggleSettings({ open: true });
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: !props.open,
            })}
            style={{ zIndex: props.open ? 1100 : 1300 }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: props.open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
Header.propTypes = {
    open: PropTypes.bool,
    getToggleSettings: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    getToggleSettings: (payload) => dispatch(getToggleSettings(payload)),
});

export default connect(null, mapDispatchToProps)(Header);
