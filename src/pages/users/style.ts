import { makeStyles } from '@material-ui/core/styles';
import styled from '../../components/layouts/sidebars/node_modules/styled-components';

export const useStyles = makeStyles((theme) => ({
    table: {
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1, 1),
        color: 'white',
        textTransform: 'none',
    },
    cancel: {
        margin: theme.spacing(1.5, 0, 1, 1),
        backgroundColor: 'white',
        color: theme.palette.primary.main,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            textTransform: 'none',
        },
    },
    select: {
        marginBottom: theme.spacing(2),
    },
}));

export const UserWrapper = styled.div`
    .flexDisplay {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 5px;
    }
    .marginChange {
        margin-bottom: 7px;
    }
`;
