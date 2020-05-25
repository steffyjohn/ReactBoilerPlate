import React from 'react';
import { useSelector } from 'react-redux';
import { FooterStyles } from '../commonStyle';
import { DefaultStore } from '../../../core/Interface/store.interface';
export default function Footer(props: any) {
    const classes = FooterStyles(props);
    const { open } = useSelector((state: DefaultStore) => state.settings);

    return (
        <footer className={classes.footer}>
            <div>
                <p className={classes.right} style={{ marginLeft: open ? '241px' : '0' }}>
                    <span>&copy; {new Date().getFullYear()} React Admin</span>
                </p>
            </div>
        </footer>
    );
}
