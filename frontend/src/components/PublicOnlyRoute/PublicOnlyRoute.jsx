import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context';

const PublicOnlyRoute = () => {
    const { isAuth } = useUser();
    return isAuth ? <Navigate to='/dashboard' /> : <Outlet />
}

export default PublicOnlyRoute;
