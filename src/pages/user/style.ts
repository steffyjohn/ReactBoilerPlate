import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { common, teal } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    table: {
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1, 1),
        color: common.white,
        textTransform: 'none',
        backgroundColor: teal[400],
        '&:hover': {
            backgroundColor: teal[300],
            color: theme.palette.common.white,
            textTransform: 'none',
        },
    },
    cancel: {
        margin: theme.spacing(0.5, 1, 1, 1),
        backgroundColor: common.white,
        color: theme.palette.primary.main,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: common.white,
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
    .MuiDialog-paperWidthSm {
        width: 500px !important;
    }
`;
