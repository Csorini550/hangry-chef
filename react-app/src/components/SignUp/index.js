import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Card, InputLabel, Input, Button } from "@material-ui/core"
import './SignUp.css';

function SignUp() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [restaurant_name, setRestaurant_name] = useState("");
    const [errors, setErrors] = useState([]);




    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ restaurant_name, email, password, name }))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    const sessionUser = useSelector((state) => state.session.user);

    // if (sessionUser) return <Redirect to="/" />;
    return (
        <div>
            <div>

                <h1>Sign Up</h1>
            </div>
            <div className="signup-main">
                <Card style={{ padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div>
                            <Input
                                placeholder="Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                placeholder="Restaurant Name"
                                type="text"
                                value={restaurant_name}
                                onChange={(e) => setRestaurant_name(e.target.value)}
                                required
                            />

                        </div>
                        <div>
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                    <Button type="submit">Sign Up</Button>
                </Card>
            </div>
        </div>
    );
}

export default SignUp;