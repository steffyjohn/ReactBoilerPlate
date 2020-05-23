import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),

            marginBottom: theme.spacing(1.5),

            fontSize: '22px',
        },
        span: {
            marginLeft: theme.spacing(1),
            fontWeight: 500,
        },
        iconButton: {
            marginLeft: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            padding: 0,
        },
        circleButton: {
            width: '29px',
            height: '28px',
        },
    }),
);
