import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
    table: {
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1, 1),
        color: 'white',
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
