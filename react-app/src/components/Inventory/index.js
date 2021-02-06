import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getInventoryByUser } from '../../store/inventory'


const Inventory = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })

    useEffect(() => {
        dispatch(getInventoryByUser(loggedInUser.id))
    }, [])

    const inventories = useSelector(state => {
        return state.inventory
    })


    if (Object.keys(inventories).length === 0) return null;
    return (
        <div>
            <h1>Inventory</h1>
            <div>
                {inventories.map((inventory, i) => {
                    return (
                        <ul>
                            <li>Name: {inventory.food_item}</li>
                            <li>Quantity: {inventory.quantity}</li>
                            <li>Quantity: {inventory.market_price}</li>

                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default Inventory;