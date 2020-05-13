import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Base from './components/Layout/Base';
import PageLoader from './components/Common/PageLoader';
import { DefaultStore } from './core/model/store.model';

const waitFor = (Tag) => (props) => <Tag {...props} />;
const Login = lazy(() => import('./pages/Login/index'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./components/Dashboard/index'));
const UserList = lazy(() => import('./components/User/index'));
const ChangePassword = lazy(() => import('./components/ChangePassword/index'));
// const Random = lazy(() => import('./components/Random'));
const Routes = (props) => {
    const { location } = props;
    const { layout, isDefaultTheme } = useSelector((state: DefaultStore) => state.settings);
    const listofPages = ['/', '/login'];

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: layout.primary,
            },
            secondary: {
                main: layout.secondary,
            },
        },
    });
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Suspense fallback={<PageLoader />}>
                <Switch location={location}>
                    <Route path="/" component={waitFor(Login)} />
                    <Route path="/login" component={waitFor(Login)} />
                </Switch>
            </Suspense>
        );
    }
    return (
        <MuiThemeProvider theme={theme}>
            <Base {...props}>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route path="/home" component={waitFor(Home)} />
                        <Route path="/dashboard" component={waitFor(Dashboard)} />
                        <Route path="/user" component={waitFor(UserList)} />
                        <Route path="/change-password" component={waitFor(ChangePassword)} />
                        {/* <Route path="/random" component={waitFor(Random)} /> */}
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
