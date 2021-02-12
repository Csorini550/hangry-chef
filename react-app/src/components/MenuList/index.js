import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import MenuActionButton from '../../components/MenuActionButton'
import './MenuList.css'
const MenuList = ({ menue_id }) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id;
    const menus = useSelector((state) => {
        return state.menue;
    })
    const menuItems = useSelector((state) => {
        return state.foodOrDrink;
    })

    useEffect(() => {
        dispatch(getFoodOrDrink(menue_id));
        dispatch(getIngredientsByUser(userId));
        dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])
    return (
        <div className="menu-container" >

            {menuItems && Object.values(menuItems).map((menuItem) => {
                return (
                    <div id="menu-item">
                        <MenuCards key={menuItem.id} name={menuItem.name} text={menuItem.description} price={menuItem.price} />
                    </div>
                )
            })}
            <MenuActionButton menue_id={menue_id} />
        </div>
    )
}

export default MenuList;
