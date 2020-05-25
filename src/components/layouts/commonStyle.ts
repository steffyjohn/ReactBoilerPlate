import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GREY, LIGHT_GREY } from './../../core/config/colorPallete';

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: 1300,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundRepeat: 'repeat-x ',
            backgroundColor: theme.palette.primary.main,
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px) `,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: `${theme.palette.secondary.main}!important`,
        },

        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        color: {
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            // padding: theme.spacing(3),
            marginBottom: '60px',
        },
        icon: {
            color: theme.palette.common.white,
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: theme.spacing(1.5),
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: GREY,
        },
    }),
);

export const FooterStyles = makeStyles((theme: Theme) => ({
    footer: {
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '0',
        height: '60px',
        borderTop: `1px solid ${LIGHT_GREY}`,
        padding: theme.spacing(0),
        zIndex: 109,
        backgroundColor: theme.palette.common.white,
    },
    right: {
        padding: theme.spacing(2, 0),
        margin: '0',
        fontSize: '14px',
        textAlign: 'center',
    },
}));
