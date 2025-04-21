import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/index.jsx';

const Protected = ({ component: Component, ...rest }) => {
    const { isAuth } = useUser();

    return isAuth ? <Outlet /> : <Navigate to='/auth' />
};

export default Protected;
