import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './Footer/index';
import { useStyles } from './CommonStyle';
import Header from './Header/index';
import Sidebar from './Sidebar/index';

function BaseLayout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header {...props} />
            <Sidebar {...props} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

BaseLayout.propTypes = {
    children: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        open: state.settings.open,
        theme: state.settings.isDefaultTheme,
    };
};

export default connect(mapStateToProps, null)(BaseLayout);
