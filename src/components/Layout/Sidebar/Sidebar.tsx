import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { getToggleSettings } from './../../../slices/settingSlice';
import { useStyles } from './../CommonStyle';
import { useTheme } from '@material-ui/core/styles';

const Items = [
    { label: 'Dashboard', Icon: <DashboardIcon />, route: '/dashboard' },
    { label: 'User', Icon: <PermIdentityIcon />, route: '/user' },
];
function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
}
function Sidebar(props) {
    const classes = useStyles();
    const _theme = useTheme();

    const Wrapper = styled.div`
        .MuiDrawer-paperAnchorDockedLeft {
            background-color: ${_theme.palette.secondary.main};
        }
    `;
    const handleDrawerClose = () => {
        props.getToggleSettings({ open: false });
    };
    const handleClick = (item) => {
        props.history.push(item.route);
    };

    return (
        <Wrapper>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: props.open,
                        [classes.drawerClose]: !props.open,
                    }),
                }}
            >
                <div className={classes.color}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuOpenIcon style={{ color: props.open ? 'white' : 'black' }} />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {Items.map((text, index) => (
                        <ListItem button key={text.label} onClick={() => handleClick(text)}>
                            <ListItemIcon
                                style={{
                                    color: activeRoute(text.route)
                                        ? _theme.palette.primary.main
                                        : props.theme
                                        ? '#515253'
                                        : 'white',
                                }}
                            >
                                {text.Icon}
                            </ListItemIcon>
                            <ListItemText
                                style={{
                                    color: activeRoute(text.route)
                                        ? _theme.palette.primary.main
                                        : props.theme
                                        ? 'rgba(81, 82, 83, 0.66)'
                                        : '#e0dede',
                                }}
                                primary={text.label}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Wrapper>
    );
}
Sidebar.propTypes = {
    open: PropTypes.bool,
    getToggleSettings: PropTypes.func,
    history: PropTypes.object,
    theme: PropTypes.bool,
};
const mapDispatchToProps = (dispatch) => ({
    getToggleSettings: (payload) => dispatch(getToggleSettings(payload)),
});
const mapStateToProps = (state) => {
    return {
        open: state.settings.open,
        theme: state.settings.isDefaultTheme,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
