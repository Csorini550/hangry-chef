import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from "react";
import NavBarHome from '../../components/NavBarHome'


const Home = () => {

    const loggedInUser = useSelector(state => {
        return state.session.user
    })
    // if (!loggedInUser) return <Redirect to="/login" />;

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )

}

export default Home;