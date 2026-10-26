import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);
        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setMessage(data.message || "Login failed");

                setLoading(false);

                return;
            }

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage("Login successful!");

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            setMessage(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <h1>Welcome Back</h1>

                    <p>
                        Login to your account
                    </p>

                </div>


                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                    {message && (

                        <p className="message">
                            {message}
                        </p>

                    )}

                </form>


                <div className="login-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <button
                        onClick={() =>
                            navigate("/register")
                        }
                        className="register-link"
                    >
                        Create Account
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Login;