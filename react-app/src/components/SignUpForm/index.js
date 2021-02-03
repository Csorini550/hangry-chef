import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session"
import { useDispatch, useSelector } from "react-redux";


const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [restaurant_name, setRestaurant_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password, restaurant_name, name }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

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

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Restaurant Name</label>
        <input
          type="text"
          name="username"
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
};

export default SignUpForm;


