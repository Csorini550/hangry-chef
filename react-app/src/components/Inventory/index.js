import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getInventoryByUser, createInventory } from '../../store/inventory'
import { newIngredient, createIngredient } from '../../store/ingredient'

const Inventory = () => {
    const [food_item, setFood_item] = useState("")
    const [quantity, setQuantity] = useState("")
    const [market_price, setMarket_price] = useState("")
    const [price, setPrice] = useState("")
    const [name, setName] = useState(food_item)
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const { userId } = useParams();
    const history = useHistory();

    const redirectToIngredients = () => {
        history.append("/")
    }

    const handleDoubleSubmit = async (e) => {
        e.preventDefault();
        const newInventory = {
            user_id: userId,
            // ingredient_id,
            food_item,
            quantity,
            market_price
        }
        const newIngredient = {
            user_id: userId,
            name,
            price
        }
        dispatch(createInventory(newInventory));
        dispatch(createIngredient(newIngredient));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newInventory = {
            user_id: userId,
            // ingredient_id,
            food_item,
            quantity,
            market_price
        }
        dispatch(createInventory(newInventory));
    }
    const inventories = useSelector(state => {
        return state.inventory
    })
    useEffect(() => {
        dispatch(getInventoryByUser(userId));
    }, [])


    // if (Object.keys(inventories).length === 0) return null;
    return (
        <div>
            <h1>Inventory</h1>
            <form onSubmit={handleSubmit}>
                <label className="create-venue">
                    Name of new item
                   <input
                        value={name}
                        type="text"
                        multiple
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="create-venue">
                    Current quantity:
                   <input
                        value={quantity}
                        type="number"
                        multiple
                        onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <label className="create-venue">
                    Market price:
                   <input
                        value={market_price}
                        type="number"
                        multiple
                        onChange={(e) => setMarket_price(e.target.value)} />
                </label>
                <button type="submit">Add as a new inventory </button>
            </form>
            <div>
                <form onSubmit={handleDoubleSubmit}>
                    <h3> Do you also want to add this item as an ingredient to be used in a meal?</h3>
                    <label className="create-venue">
                        Do you want to call this item something different on your menue?
                   <input
                            value={food_item}
                            type="text"
                            multiple
                            onChange={(e) => setFood_item(e.target.value)} />
                    </label>
                    <label className="create-venue">
                        If a customer wants to add this item do a dish how much will you charge them?
                   <input
                            value={price}
                            type="number"
                            multiple
                            onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <button type="submit">Submit as a new ingredient as well</button>
                </form>
            </div>
            <div>
                {inventories && Object.values(inventories).map((inventory, i) => {
                    return (
                        <ul>
                            <li>Name: {inventory.food_item}</li>
                            <li>Quantity: {inventory.quantity}</li>
                            <li>Quantity: {inventory.market_price}</li>

                        </ul>
                    )
                })}
            </div>
            <button onClick={redirectToIngredients}>Want to checkout your ingredients?</button>
        </div>
    )
}

export default Inventory;