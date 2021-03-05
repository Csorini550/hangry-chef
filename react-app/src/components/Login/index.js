import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login, setUser } from "../../store/session";
import { useDispatch } from 'react-redux'
import "./Login.css";


const Login = ({ authenticated, setAuthenticated }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const user = dispatch(login(email, password));
        // console.log("USER", user)
        if (!user.errors) {
            setAuthenticated(true);
            dispatch(setUser(user.data));
            // return <Redirect to="/" />;
        } else {
            setErrors(user.errors);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const demoLogin = async (e) => {
        const user = dispatch(login('demo@aa.io', 'password'));
        setAuthenticated(true);
        history.push(`/1`)
        // dispatch(setUser(user.data));

    }

    if (authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-container">
            <form id="login-form" onSubmit={onLogin}>
                <div className="login-inputs">
                    <div id="errors">
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                    </div>
                    <div id="email">
                        <label htmlFor="email">
                            <input
                                id="email-field"
                                name="email"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={updateEmail}
                            />
                        </label>
                    </div>
                    <div id="password">
                        <label htmlFor="password">
                            <input
                                id="password-field"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={updatePassword}
                            />
                        </label>
                    </div>
                    <div className="login-btn">
                        <button type="submit" id="login-btn">Login</button>
                        <button type='submit' onClick={demoLogin}>Demo Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
