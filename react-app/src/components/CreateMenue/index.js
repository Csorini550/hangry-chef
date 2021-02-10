import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, draggable } from 'react-beautiful-dnd'
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import MenuList from '../../components/MenuList'
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
    const menue = useSelector((state) => {
        return state.menue;
    })
    const ingredients = useSelector((state) => {
        return state.ingredients;
    })

    const item = Object.keys(menueItems).map((menueItem, i) => {
        return menueItem;
    })


    useEffect(() => {
        dispatch(getFoodOrDrink(userId));
        dispatch(getIngredientsByUser(userId))
        dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])

    const dragEnd = (res) => {

    }

    return (
        <>
            <div>
                <h1>Create a menue</h1>
            </div>
            {menuItems && Object.values(menuItems).map((menuItem) => {
                <MenuList title={menuItem.
            })}
            <div>
                { }
            </div>
            {/* <DragDropContext onDragEnd={dragEnd}>
                    <dropable>
                        <div className="whole-menue">
                            <form>
                                <label className="create-venue">
                                    Menu Title
                   <input
                                        value={menuTitle}
                                        type="text"
                                        multiple
                                        onChange={(e) => setMenuTitle(e.target.value)} />
                                </label>
                            </form>
                            
                        </div>
                    </dropable>
                    <droppable>
                        <draggable >
                            <form className="food-item header">
                                <label className="create-venue">
                                    Header
                   <input
                                        value={header}
                                        type="text"
                                        multiple
                                        onChange={(e) => setHeader(e.target.value)} />
                                </label>
                            </form>
                        </draggable>
                    </droppable>
                    <draggable >
                        <form className="food-item">

                        </form>
                    </draggable>
                </DragDropContext>
            </div> */}

        </>
    )

}


export default CreateMenue