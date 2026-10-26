import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <div style={{
            padding: "40px",
            fontFamily: "Arial"
        }}>

            <h1>
                Welcome to Dashboard
            </h1>

            <h2>
                Hello, {user?.name}
            </h2>

            <p>
                Email: {user?.email}
            </p>

            <p>
                Role: {user?.role}
            </p>


            <button
                onClick={handleLogout}
                style={{
                    padding: "12px 25px",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>

        </div>

    );
};

export default Dashboard;