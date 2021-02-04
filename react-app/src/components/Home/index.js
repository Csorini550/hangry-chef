import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from "react";


const Home = () => {



    const loggedInUser = useSelector(state => {
        return state.session.user;
    })

    return (
        <h1>Home Page</h1>
    )

}

export default Home;