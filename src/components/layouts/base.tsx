import React from 'react';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './footers/index';
import { useStyles } from './commonStyle';
import Header from './headers/index';
import Sidebar from './sidebars/index';

function BaseLayout(props: any) {
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

export default BaseLayout;
