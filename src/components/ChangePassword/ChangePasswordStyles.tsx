import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: `calc(100vh - ${200}px) `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(3),
        border: '1px solid lightgray',
        borderRadius: theme.spacing(3),
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#85908f',
    },
    form: {
        maxWidth: '400px',
        marginBottom: '10px',

        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    color: {
        background: 'white',
        margin: 'auto',
        borderRadius: theme.spacing(1.5),
    },
    submit: {
        margin: theme.spacing(1.5, 0, 2),
        backgroundColor: '#26a69a',
        '&:hover': {
            backgroundColor: '#26a69abd',
        },
    },
}));
