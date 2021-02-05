import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom"
import { signUp } from "../../store/session";


function SignUpForm({ authenticated, setAuthenticated }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [restaurant_name, setRestaurant_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);



    const updateRestaurant = (e) => {
        setRestaurant_name(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updateName = (e) => {
        setName(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(signUp({ email, password, restaurant_name, name }))
                // .then((res) => { history.push(`/closet/${res}`) })     // need to make sure redirect works properly
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>Restaurant Name</label>
                <input
                    type="text"
                    name="restaurant_name"
                    onChange={updateRestaurant}
                    value={restaurant_name}
                ></input>
            </div>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={updateName}
                    value={name}
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <label>
                Confirm Password
          <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
