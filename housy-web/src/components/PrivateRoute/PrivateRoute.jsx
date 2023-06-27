import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

export function PrivateRouteAdmin() {
    let Navigate = useNavigate();

    const [state] = useContext(UserContext);

    useEffect(() => {
        if (state.role === 'admin' && state.isLogin) {
            return Navigate('/admin')
        }
    //eslint-disable-next-line      
    },
    //eslint-disable-next-line
    [state])

    return <Outlet />
}

export function PrivateRouteUser() {
    const [state] = useContext(UserContext);
    let Navigate = useNavigate();
    
    useEffect(() => {
        if (state.role === 'buyer' && state.isLogin) {
            return Navigate('/userProfile')
        }
    //eslint-disable-next-line
    },
    //eslint-disable-next-line
    [state])

    return <Outlet />
}

export function PrivateRouteNotLogin() {
    const [state] = useContext(UserContext);

    useEffect(() => {
        if (!state.isLogin) {
            return <Navigate to='/'/>
        }
    }, [state])

    return <Outlet />
}