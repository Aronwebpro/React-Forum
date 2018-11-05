import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = (props) => {
    const { user } = props;
    return (
        user ? (
            <Route {...props} />
        ) : (
            <Redirect to={'/'} push />
        )
    );
};

AuthenticatedRoute.propTypes = {
    user: PropTypes.object,
    path: PropTypes.string.isRequired,
    render: PropTypes.func,
    component: PropTypes.func,
};


export default AuthenticatedRoute;