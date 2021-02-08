import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, draggable } from 'react-beautiful-dnd'
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import './CreateMenue.css'
const CreateMenue = () => {

    const dispatch = useDispatch()
    const { menueId } = useParams()
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id

    const menueItems = useSelector((state) => {
        return state.foodOrDrink;
    })
    const menue = useSelector((state) => {
        return state.menue
    })

    item = Object.keys(menueItems).map((menueItem, i) => {
        return menueItem
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

            <div>
                <DragDropContext onDragEnd={dragEnd}>
                    <div className="whole-menue">

                    </div>
                </DragDropContext>
                <draggable >
                    <form className="food-item">

                    </form>
                </draggable>
            </div>

        </>
    )

}


export default CreateMenue