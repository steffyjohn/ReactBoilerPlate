import { makeStyles } from '@material-ui/core/styles';
import { GREY } from './../../core/config/colorPallete';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: `calc(100vh - ${200}px) `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
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
        backgroundColor: GREY,
    },
    form: {
        // maxWidth: '400px',
        marginBottom: '10px',
        width: '100%',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    color: {
        background: theme.palette.common.white,
        margin: 'auto',
        borderRadius: theme.spacing(1.5),
    },
    submit: {
        margin: theme.spacing(0, 0, 2),
        color: theme.palette.common.white,
        width: '100%',
    },
}));
export const ChangePasswordWrapper = styled.div`
    .MuiContainer-root {
        padding-left: 0px;
        padding-right: 0px;
    }
`;
