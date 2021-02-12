import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, draggable } from 'react-beautiful-dnd'
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import MenuList from '../../components/MenuList'
import MenuActionButton from '../../components/MenuActionButton'
import Card from "@material-ui/core/Card"
import MenuCreatorButton from '../../components/MenuCreatorButton'
import './CreateMenue.css'
const CreateMenue = () => {
    const [menuTitle, setMenuTitle] = useState("");
    const [header, setHeader] = useState("");

    const dispatch = useDispatch();
    const { menueId } = useParams();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id

    const menuItems = useSelector((state) => {
        return state.foodOrDrink;
    })
    const menus = useSelector((state) => {
        return state.menue;
    })
    const ingredients = useSelector((state) => {
        return state.ingredients;
    })

    // const item = Object.keys(menueItems).map((menueItem, i) => {
    //     return menueItem;
    // })


    useEffect(() => {
        // dispatch(getFoodOrDrink(userId));
        // dispatch(getIngredientsByUser(userId))
        dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])

    const dragEnd = (res) => {
        //TODO reorder logic
    }

    const menuName = menus[1] ? menus[1].menue_name : ""
    return (
        <dragDropContext onDragEnd={dragEnd}>
            <div>
                <div className="full-menu">
                    <h1 id="menu-name">{menuName}</h1>

                    {menus && Object.values(menus).map((menu) => {
                        return (
                            <div menue_id={menu.id} className="full-menu-text">
                                <Card>
                                    <h2>{menu.food_item}</h2>
                                    <MenuList menue_id={menu.id} />
                                </Card>
                            </div>
                        )
                    })}
                </div>
                <MenuCreatorButton />
            </div>
        </dragDropContext>
    )

}


export default CreateMenue