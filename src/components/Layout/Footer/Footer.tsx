import React from 'react';
import { FooterStyles } from './../CommonStyle';

export default function Footer(props) {
    const classes = FooterStyles();
    return (
        <footer className={classes.footer}>
            <div>
                <p className={classes.right}>
                    <span>&copy; {new Date().getFullYear()} React Admin</span>
                </p>
            </div>
        </footer>
    );
}
