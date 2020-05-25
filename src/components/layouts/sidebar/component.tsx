import React from 'react';
import clsx from 'clsx';
import { common, blueGrey } from '@material-ui/core/colors';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useTheme } from '@material-ui/core/styles';
import { getToggleSettings } from '../../../slices/settingSlice';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../commonStyle';
import { DefaultStore } from '../../../core/Interface/store.interface';

interface SidebarProps {
    open: boolean;
    getToggleSettings: Function;
    history: any;
    isDefaultTheme: any;
}

const Items = [
    { label: 'Dashboard', Icon: <DashboardIcon />, route: '/dashboard' },
    { label: 'User', Icon: <PermIdentityIcon />, route: '/user' },
];
function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
}
function Sidebar(props: SidebarProps) {
    const { open, isDefaultTheme } = useSelector((state: DefaultStore) => state.settings);
    const [checked, setchecked] = React.useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const _theme = useTheme();
    const history = useHistory();
    const { white, black } = common;
    const Wrapper = styled.div`
        .MuiDrawer-paperAnchorDockedLeft {
            background-color: ${_theme.palette.secondary.main};
        }
    `;
    const handleDrawerClose = () => {
        dispatch(getToggleSettings({ open: false }));
    };
    const handleClick = (item) => {
        setchecked(true);
        history.push(item.route);
    };
    React.useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 850) {
                dispatch(getToggleSettings({ open: false }));
            }
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <Wrapper>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.color}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuOpenIcon style={{ color: open ? white : black }} />
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
                                        : isDefaultTheme
                                        ? blueGrey[600]
                                        : white,
                                }}
                            >
                                {text.Icon}
                            </ListItemIcon>
                            <ListItemText
                                style={{
                                    color: activeRoute(text.route)
                                        ? _theme.palette.primary.main
                                        : isDefaultTheme
                                        ? blueGrey[600]
                                        : blueGrey[50],
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

export default Sidebar;
