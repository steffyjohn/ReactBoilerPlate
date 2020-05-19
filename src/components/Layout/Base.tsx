import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './Footer/index';
import { useStyles } from './CommonStyle';
import Header from './Header/index';
import Sidebar from './Sidebar/index';

function BaseLayout(props) {
    const classes = useStyles();
    const wrapper = React.useRef<any>(null);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ToastContainer />
            <Header {...props} />
            <Sidebar {...props} />
            <main className={classes.content}>
                <div ref={wrapper} className={classes.toolbar} />
                {props.children}
            </main>
            <Footer />
        </div>
    );
}
BaseLayout.propTypes = {
    children: PropTypes.any,
};
export default BaseLayout;
