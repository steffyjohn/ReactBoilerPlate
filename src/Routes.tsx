import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Base from './components/Layout/Base';
import PageLoader from './components/Common/PageLoader';
import useCommonTheme from './core/config/CommonTheme';

const waitFor = (Tag) => (props) => <Tag {...props} />;

const Routes = (props) => {
    const { location } = props;
    const listofPages = ['/', '/login'];
    const theme = useCommonTheme();
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Suspense fallback={<PageLoader />}>
                <Switch location={location}>
                    <Route path="/" component={waitFor(lazy(() => import('./pages/Login/index')))} />
                    <Route path="/login" component={waitFor(lazy(() => import('./pages/Login/index')))} />
                </Switch>
            </Suspense>
        );
    }
    return (
        <MuiThemeProvider theme={theme}>
            <Base {...props}>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route
                            path="/dashboard"
                            component={waitFor(lazy(() => import('./components/Dashboard/index')))}
                        />
                        <Route path="/user" component={waitFor(lazy(() => import('./components/User/index')))} />
                        <Route
                            path="/change-password"
                            component={lazy(() => import('./components/ChangePassword/index'))}
                        />
                    </Switch>
                </Suspense>
            </Base>
        </MuiThemeProvider>
    );
};
Routes.propTypes = {
    location: PropTypes.object,
    layout: PropTypes.object,
};

export default withRouter(Routes);
