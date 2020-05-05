import React from 'react';
import clsx from 'clsx';
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

const Items = [
    { label: 'Dashboard', Icon: <DashboardIcon /> },
    { label: 'User', Icon: <PermIdentityIcon /> },
];
function Sidebar(props) {
    const classes = useStyles();
    const handleDrawerClose = () => {
        props.getToggleSettings({ open: false });
    };

    return (
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
                    <MenuOpenIcon style={{ color: 'white' }} />
                </IconButton>
            </div>
            <Divider />
            <List>
                {Items.map((text, index) => (
                    <ListItem button key={text.label}>
                        <ListItemIcon>{text.Icon}</ListItemIcon>
                        <ListItemText primary={text.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
Sidebar.propTypes = {
    open: PropTypes.bool,
    getToggleSettings: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    getToggleSettings: (payload) => dispatch(getToggleSettings(payload)),
});
const mapStateToProps = (state) => {
    return {
        open: state.settings.open,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
