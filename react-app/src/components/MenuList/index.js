import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import './MenuList.css'
const MenuList = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id;
    const menus = useSelector((state) => {
        return state.menue;
    })

    useEffect(() => {
        dispatch(getFoodOrDrink(userId));
        dispatch(getIngredientsByUser(userId));
        dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])
    return (
        <div >
            <h1>Why doesnt this show???</h1>
            {menus && Object.values(menus).map((menu) => {
                return (
                    <div className="menu-container">
                        <h3>{menu.menue_name}</h3>
                        <MenuCards />
                    </div>
                )

            })}

        </div>
    )
}

export default MenuList;
