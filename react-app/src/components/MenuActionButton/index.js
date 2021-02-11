import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from "../../store/foodOrDrink"
import Icon from "@material-ui/core/Icon";
import styled from "styled-components"
import Textarea from "react-textarea-autosize"
import Card from '@material-ui/core/Card';
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

    useEffect(() => {
        dispatch(getFoodOrDrink(userId));
        // dispatch(getIngredientsByUser(userId));
        // dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, []);
    const openForm = () => {
        setOpen(!open);
        // renderForm();
    };
    const closeForm = (e) => {
        setOpen(!open);
    };

    const buttonText = menuItems ? "Add another Section" : "Add another item"

    const buttonTextOpacity = menuItems ? 1 : .5;
    const buttonTextColor = menuItems ? "white" : "inherit"
    const buttonTextBackground = menuItems ? "rgba(0,0,0,.15" : "inherit"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            description,
            name,
            price,
            menue_id: menue_id
        }
        dispatch(createFoodOrDrink(newItem))

    };
    const formButton = styled.div`
            opacity: ${buttonTextOpacity};
            color: ${buttonTextColor};
            backgroundColor: ${buttonTextBackground};
        `
    if (open === true) {


        return (
            <div>
                <Card>
                    <form >
                        <input
                            autoFocus
                            id=""
                            name="name"
                            type="text"
                            placeholder="name of item"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Textarea

                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Meal description"
                        />
                        <input
                            id=""
                            name="price"
                            type="number"
                            placeholder="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </form>
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={closeForm}>Cancel</button>
                </Card>
            </div >
        )
    } else {


        return (

            <formButton onClick={openForm} id="add-button">
                <Icon className="icon">add</Icon>
                <p>{buttonText}</p>
            </formButton >
        )
    }
}

export default MenuActionButton;