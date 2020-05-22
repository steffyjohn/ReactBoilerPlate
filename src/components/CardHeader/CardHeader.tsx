import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './CardHeaderStyle';

interface CardHeaderProps {
    title?: string;
    permssion?: boolean;
    onClick?: any;
}
function CardHeader(props: CardHeaderProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <span className={classes.span}>{props.title}</span>

                    {props.permssion && (
                        <IconButton className={classes.iconButton} size="medium" onClick={() => props.onClick()}>
                            <AddCircleIcon color="primary" />
                        </IconButton>
                    )}
                </Paper>
            </Grid>
        </div>
    );
}

export default CardHeader;
