import { makeStyles } from '@material-ui/core/styles';
import AdminImage from './../../assets/9.jpg';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${AdminImage})`,
        backgroundRepeat: 'no-repeat',
        // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '25px',
        paddingBottom: '25px',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#b188c5',
    },
    form: {
        maxWidth: '400px',
        marginBottom: '10px',
        paddingLeft: '25px',
        paddingRight: '25px',
        // width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    color: {
        background: 'white',
        // maxHeight: "50vh",
        margin: 'auto',
        borderRadius: '10px',
    },
    submit: {
        margin: theme.spacing(1.5, 0, 2),
    },
}));
