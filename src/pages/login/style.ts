import { makeStyles } from '@material-ui/core/styles';
import AdminImage from './../../assets/Admin.jpg';
import { teal, common, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        // backgroundImage: `url(${AdminImage})`,
        backgroundImage: 'linear-gradient(-20deg, #26a69a 0%, #8ddad5 100%);',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5),
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: grey[700],
    },
    form: {
        maxWidth: '400px',
        width: '80%',
        marginTop: theme.spacing(1),
    },
    color: {
        background: common.white,
        margin: 'auto',
        borderRadius: theme.spacing(1.5),
    },
    submit: {
        // margin: theme.spacing(1.5, 0, 2),
        backgroundColor: teal[400],
        width: '100%',
        height: '40px',
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: teal[300],
        },
    },
}));
