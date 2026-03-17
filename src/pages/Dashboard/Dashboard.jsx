import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { use, useEffect } from "react";

const Dashboard = () => {
    const navigate = useNavigate()

    const {  user, loading } = useAuth();

    console.log("hiii dasy "+ user)
    if (loading) return <p>Loading...</p>;
    return (
        <h3>Hello dashboard - {user.name}-{user.role}</h3>
    );
}

export default Dashboard