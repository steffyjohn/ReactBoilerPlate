import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useTheme } from '@material-ui/core/styles';
import { getToggleSettings } from './../../../slices/settingSlice';
import { useHistory } from 'react-router-dom';
import { useStyles } from './../CommonStyle';
import { DefaultStore } from './../../../core/model/store.model';

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
                        <MenuOpenIcon style={{ color: open ? 'white' : 'black' }} />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {/* {open&&<Collapse in={checked}>
                <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar> 
                <span className={classes.icon}>Hi Steffy</span>
               
                     </div>   
                  
        
        </Collapse>} */}
                    {Items.map((text, index) => (
                        <ListItem button key={text.label} onClick={() => handleClick(text)}>
                            <ListItemIcon
                                style={{
                                    color: activeRoute(text.route)
                                        ? _theme.palette.primary.main
                                        : isDefaultTheme
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
                                        : isDefaultTheme
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

export default Sidebar;
