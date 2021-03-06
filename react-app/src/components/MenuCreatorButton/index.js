import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createMenu } from "../../store/menue"
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import "./MenuCreatorButton.css"




const MenuCreatorButton = (setFixState) => {
    const [open, setOpen] = useState(false);
    const [menue_name, setMenueName] = useState("");
    const [food_item, setFoodItem] = useState("");

    const dispatch = useDispatch();
    // useEffect(() => {
    //     // dispatch(getFoodOrDrink(userId));
    // }, []);

    const loggedInUser = useSelector(state => {
        return state.session.user;
    });
    const userId = loggedInUser.id;
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenu = {
            menue_name,
            food_item,
            user_id: userId

        };
        dispatch(createMenu(newMenu));
        setMenueName("");
        setFoodItem("");
        closeForm();
    };


    if (open === true) {
        return (
            <Card>
                <form>
                    <div className="stupid-form">
                        <input
                            autoFocus
                            id=""
                            name="Menu Name"
                            type="text"
                            placeholder="All menu names must match!"
                            value={menue_name}
                            onChange={(e) => setMenueName(e.target.value)}
                        />
                    </div>
                    <div className="stupid-form">
                        <input
                            id=""
                            name="food Item"
                            type="text"
                            placeholder="ex. Entrees"
                            value={food_item}
                            onChange={(e) => setFoodItem(e.target.value)}
                        />
                    </div>
                </form>
                <div id="food-form-button">
                    <Button type="submit" className="food-add-button" onClick={handleSubmit}>Add</Button>
                    <Button onClick={closeForm}>Cancel</Button>
                </div>
            </Card>
        )
    } else {
        return (

            <Button onClick={openForm} id="add-button">
                <Icon className="icon">add</Icon>
                <p>Create new menu Section</p>
            </Button >
        )
    }

}
export default MenuCreatorButton;