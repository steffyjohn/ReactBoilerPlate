import React from 'react';
import loadable from '@loadable/component';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Base from './components/layouts/base';
import useCommonTheme from './core/config/commonTheme';
import Login from './pages/logins/index';
import Dashboard from './pages/dashboards/index';
import User from './pages/users/index';
import ChangePassword from './pages/changePasswords/index';

// const waitFor = (Tag) => (props) => <Tag {...props} />;

const Routes = (props: RoutesProps) => {
    const { location } = props;
    const listofPages = ['/', '/login'];
    const theme = useCommonTheme();
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Switch location={location}>
                <Route path="/" component={Login} />
                <Route path="/login" component={Login} />
            </Switch>
        );
    }
    return (
        <MuiThemeProvider theme={theme}>
            <Base {...props}>
                <Switch location={location}>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/user" component={User} />
                    <Route path="/change-password" component={ChangePassword} />
                </Switch>
            </Base>
        </MuiThemeProvider>
    );
};
const RoutePropTypes = {
    location: PropTypes.any,
    layout: PropTypes.object,
};
type RoutesProps = PropTypes.InferProps<typeof RoutePropTypes>;

export default withRouter(Routes);
