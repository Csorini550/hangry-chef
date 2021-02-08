import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, draggable } from 'react-beautiful-dnd'
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'

const CreateMenue = () => {

    const dispatch = useDispatch()
    const { menueId } = useParams()
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id

    const menueItem = useSelector((state) => {
        return state.foodOrDrink;
    })



    useEffect(() => {
        dispatch(getFoodOrDrink(menueId))
        dispatch(getIngredientsByUser(userId))
        dispatch(getMenueByUser(userId))
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])

    // state = { menue: menue }
    // const onDragEnd = (res) => {
    //     const { destination, source, reason } = result;

    //     if (!destination || reason === "CANCEL") {
    //         return
    //     }
    //     if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //         return
    //     }
    //     const menue = Object.assign([], this.state.menue)
    //     const droppedMenueItem = this.state.menue[source.index]
    //     menue.splice(source.index, 1)
    //     menue.splice(destination.index, 0, droppedMenueItem)
    //     this.setState({ menue })
    // }

    return (
        <>
            <div>
                <h1>Create a menue</h1>
            </div>

            <div>
                <DragDropContext >

                    <div>

                    </div>
                </DragDropContext>
                <form>

                </form>
            </div>

        </>
    )

}


export default CreateMenue