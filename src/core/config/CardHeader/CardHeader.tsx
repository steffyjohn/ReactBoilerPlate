import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),

            marginBottom: '10px',

            fontSize: '20px',
        },
        span: {
            marginLeft: '10px',
        },
        iconButton: {
            marginLeft: '5px',
            marginBottom: '5px',
            padding: 0,
        },
    }),
);
function CardHeader(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <span className={classes.span}>{props.title}</span>

                    {props.permssion && (
                        <IconButton className={classes.iconButton} onClick={() => props.onClick()}>
                            <AddCircleIcon color="primary" />
                        </IconButton>
                    )}
                </Paper>
            </Grid>
        </div>
    );
}
CardHeader.propTypes = {
    title: PropTypes.string,
    permssion: PropTypes.bool,
    onClick: PropTypes.func,
};
export default CardHeader;
