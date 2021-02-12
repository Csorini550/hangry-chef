import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from "../../store/foodOrDrink"
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize"
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import "./MenuActionButton.css"
const MenuActionButton = ({ menue_id }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();

    const menuItems = useSelector((state) => {
        return state.foodOrDrink;
    })
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const userId = loggedInUser.id;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            description,
            name,
            price,
            menue_id: menue_id
        }
        dispatch(createFoodOrDrink(newItem))
        closeForm()
    };
    useEffect(() => {
        dispatch(getFoodOrDrink(userId));
    }, []);
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };


    if (open === true) {
        return (
            <Card id="add-food-item-card">
                <div >
                    <form id="add-food-item-form" >
                        <div className="stupid-form">
                            <input
                                autoFocus
                                id=""
                                name="name"
                                type="text"
                                placeholder="name of item"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="stupid-form">
                            <Textarea

                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Meal description"
                            />
                        </div>
                        <div className="stupid-form">
                            <input
                                id=""
                                name="price"
                                type="number"
                                placeholder="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </form>
                    <div id="food-form-button">
                        <Button type="submit" className="food-add-button" onClick={handleSubmit}>Add</Button>
                        <Button onClick={closeForm}>Cancel</Button>
                    </div>
                </div >
            </Card>
        )
    } else {


        return (

            <Button onClick={openForm} id="add-button">
                <Icon className="icon">add</Icon>
                <p>Add another item</p>
            </Button >
        )
    }
}

export default MenuActionButton;