import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Base from './components/Layout/Base';

const waitFor = (Tag) => (props) => <Tag {...props} />;
const Login = lazy(() => import('./pages/Login/index'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./components/Dashboard/index'));
const UserList = lazy(() => import('./components/User/index'));

const Routes = (props) => {
    const { location } = props;
    const listofPages = ['/', '/login'];

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: props.layout.primary,
            },
            secondary: {
                main: props.layout.secondary,
            },
        },
    });
    if (listofPages.indexOf(location.pathname) > -1) {
        return (
            <Suspense fallback={<div>Loading</div>}>
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
                <Suspense fallback={<div>Loading</div>}>
                    <Switch location={location}>
                        <Route path="/home" component={waitFor(Home)} />
                        <Route path="/dashboard" component={waitFor(Dashboard)} />
                        <Route path="/user" component={waitFor(UserList)} />
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
const mapStateToProps = (state) => {
    return {
        theme: state.settings.isDefaultTheme,
        layout: state.settings.layout,
    };
};
export default withRouter(connect(mapStateToProps, null)(Routes));
