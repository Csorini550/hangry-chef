import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from "react";
import NavBarHome from '../../components/NavBarHome'
// import {getMenuList} from '../../store/menuList'

const Home = () => {

    const loggedInUser = useSelector(state => {
        return state.session.user
    })
    const menuList = useSelector((state) => {
        return state.foodOrDrink
    });
    // if (!loggedInUser) return <Redirect to="/login" />;

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                Checkout button goes here
            </div>
            <div>
                The menu goes here
            </div>
        </div>
    )

}

export default Home;