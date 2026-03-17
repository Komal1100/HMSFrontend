import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({  allowedRoles = []}){
    const navigate = useNavigate();
    const {isAuthenticated  , loading , user} = useAuth()
    useEffect(()=>{
        if(!loading && !isAuthenticated){
            navigate("/login")
        }
    }, [loading])

    if(allowedRoles.length>0 && !allowedRoles.includes(user?.role)){
        navigate("/login")
    }
    return <Outlet/>;
}

export default ProtectedRoute