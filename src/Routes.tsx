import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Base from './components/layouts/base';
import Login from './pages/login/index';
import Dashboard from './pages/dashboard/index';
import User from './pages/user/index';
import ChangePassword from './pages/changePassword/index';

const Routes = (props: RoutesProps) => {
    const { location } = props;
    const listofPages = ['/', '/login'];
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Switch location={location}>
                <Route path="/" component={Login} />
                <Route path="/login" component={Login} />
            </Switch>
        );
    }
    return (
        <Base {...props}>
            <Switch location={location}>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/user" component={User} />
                <Route path="/change-password" component={ChangePassword} />
            </Switch>
        </Base>
    );
};
const RoutePropTypes = {
    location: PropTypes.any,
    layout: PropTypes.object,
};
type RoutesProps = PropTypes.InferProps<typeof RoutePropTypes>;

export default withRouter(Routes);
