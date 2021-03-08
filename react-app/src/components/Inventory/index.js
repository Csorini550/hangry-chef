import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getInventoryByUser, createInventory, deleteInventory, editInventory } from '../../store/inventory'
import { newIngredient, createIngredient } from '../../store/ingredient'
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import "./Inventory.css"
import Input from '@material-ui/core/Input';
import { FormLabel, ListItemText } from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import InventoryModal from "../../components/InventoryModal"

const Inventory = () => {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(true);
    const [food_item, setFoodItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [market_price, setMarket_price] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const { userId } = useParams();
    const history = useHistory();
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };

    const openEdit = () => {
        setEdit(!edit);
    };

    const closeEdit = () => {
        setEdit(!edit)
    }

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
        closeForm()
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
        closeForm()
    }

    const handleDelete = (inventoryId) => {
        // e.preventDefault();
        dispatch(deleteInventory(inventoryId));
    };

    const handleEdit = (inventoryId, food_item, quantity, market_price) => {
        dispatch(editInventory(inventoryId, food_item, quantity, market_price))
    }

    const inventories = useSelector(state => {
        return state.inventory
    })
    useEffect(() => {
        dispatch(getInventoryByUser(userId));
    }, [modal])


    if (open === true) {


        return (
            <div className="big-div">
                <div className="inv-container">

                    <h1>Inventory</h1>
                    <div className="inventory-main">
                        {inventories && Object.values(inventories).map((inventory, i) => {
                            return (
                                <Card style={{ backgroundColor: "#2A9D8F", width: "200px", margin: "15px" }}>
                                    <ul className="inv-list">
                                        <ListItemText>{inventory.food_item}</ListItemText>
                                        <ListItemText>Quantity: {inventory.quantity}</ListItemText>
                                        <ListItemText>Price: ${inventory.market_price}</ListItemText>
                                    </ul>
                                    <Button type='delete' value='Delete' className='input' onClick={() => handleDelete(inventory.id)}> Delete</Button>
                                    <Button type="edit" value="Edit" className='input' > </Button>
                                    <InventoryModal setModal={setModal} inventory_Id={inventory.id} name={inventory.food_item} quant={inventory.quantity} price={inventory.market_price} />
                                </Card>
                            )
                        })}
                    </div>
                    <Button style={{ backgroundColor: "#F4A261" }} onClick={openForm} >Add new Inventory</Button>
                    {/* <Button style={{ backgroundColor: "#F4A261", alignItems: "center" }} onClick={redirectToIngredients}>Want to checkout your ingredients?</Button> */}
                </div>
            </div>
        )
    } else {
        return (
            <Card>
                <form onSubmit={handleSubmit} style={{ backgroundColor: "#264653" }}>
                    <Button onClick={closeForm} style={{ backgroundColor: "#2A9D8F" }}>Cancel</Button>
                    <FormLabel className="create-venue">
                        Name of new item
                   <Input
                            style={{ margin: "20px" }}
                            value={food_item}
                            type="text"
                            multiple
                            onChange={(e) => setFoodItem(e.target.value)} />
                    </FormLabel>
                    <FormLabel className="create-venue">
                        Current quantity:
                   <Input
                            style={{ margin: "20px" }}
                            value={quantity}
                            type="number"
                            multiple
                            onChange={(e) => setQuantity(e.target.value)} />
                    </FormLabel>
                    <FormLabel className="create-venue">
                        Market price:
                   <Input
                            style={{ margin: "20px" }}
                            value={market_price}
                            type="number"
                            multiple
                            onChange={(e) => setMarket_price(e.target.value)} />
                    </FormLabel>
                    <Button style={{ backgroundColor: "#2A9D8F" }} type="submit">Add as a new inventory </Button>
                </form>
                {/* <form onSubmit={handleDoubleSubmit}>
                    <h3> Do you also want to add this item as an ingredient to be used in a meal?</h3>
                    <FormLabel className="create-venue">
                        Do you want to call this item something different on your menu?
                   <Input
                            style={{ margin: "20px" }}
                            value={name}
                            type="text"
                            placeholder={food_item}
                            multiple
                            onChange={(e) => setName(e.target.value)} />
                    </FormLabel>
                    <FormLabel className="create-venue">
                        If a customer wants to add this item do a dish how much will you charge them?
                   <Input
                            style={{ margin: "20px" }}
                            value={price}
                            type="number"
                            multiple
                            onChange={(e) => setPrice(e.target.value)} />
                    </FormLabel>
                    <Button style={{ backgroundColor: "#2A9D8F" }} type="submit">Submit as a new ingredient as well</Button>

                </form> */}
            </Card >
        )
    }
}

export default Inventory;