import React from 'react';
import loadable from '@loadable/component';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Base from './components/Layout/Base';
import PageLoader from './components/Common/PageLoader';
import useCommonTheme from './core/config/CommonTheme';

// const waitFor = (Tag) => (props) => <Tag {...props} />;

const Routes = (props: RoutesProps) => {
    const { location } = props;
    const listofPages = ['/', '/login'];
    const theme = useCommonTheme();
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Switch location={location}>
                <Route path="/" component={loadable(() => import('./pages/Login/index'))} />
                <Route path="/login" component={loadable(() => import('./pages/Login/index'))} />
            </Switch>
        );
    }
    return (
        <MuiThemeProvider theme={theme}>
            <Base {...props}>
                <Switch location={location}>
                    <Route path="/dashboard" component={loadable(() => import('./pages/Dashboard/index'))} />
                    <Route path="/user" component={loadable(() => import('./pages/User/index'))} />
                    <Route path="/change-password" component={loadable(() => import('./pages/ChangePassword/index'))} />
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
