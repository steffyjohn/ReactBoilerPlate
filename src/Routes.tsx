import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const waitFor = (Tag) => (props) => <Tag {...props} />;
const Login = lazy(() => import('./pages/Login/index'));
const Home = lazy(() => import('./pages/Home'));

const Routes = (props) => {
    const { location } = props;
    const listofPages = ['/', '/login'];
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
        <Suspense fallback={<div>Loading</div>}>
            <Switch location={location}>
                <Route path="/home" component={waitFor(Home)} />
            </Switch>
        </Suspense>
    );
};
Routes.propTypes = {
    location: PropTypes.object,
};
export default withRouter(Routes);
