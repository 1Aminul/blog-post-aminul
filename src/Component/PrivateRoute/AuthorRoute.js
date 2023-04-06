import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthor from '../Hooks/useAuthor';

const AuthorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const [isAuthor, isAuthorLoading] = useAuthor(user?.email)

    if(loading || isAuthorLoading){
        return <p>Loading...........</p>
    }

    if (user && isAuthor){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AuthorRoute;