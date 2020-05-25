import React from 'react';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './footer/index';
import { useStyles } from './commonStyle';
import Header from './header/index';
import Sidebar from './sidebar/index';

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
