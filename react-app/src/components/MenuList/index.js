import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import MenuActionButton from '../../components/MenuActionButton'
import { Droppable, Draggable } from "react-beautiful-dnd"
import './MenuList.css'
const MenuList = ({ menue_id, index }) => {
    const [fixState, setFixState] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id;
    const menuItems = useSelector((state) => {
        return state.foodOrDrink[menue_id];
    })
    useEffect(() => {
        dispatch(getFoodOrDrink(menue_id));
    }, [fixState])
    return (
        // <Draggable draggableId={String(menue_id)} index={index}>
        //     {(provided) => (
        //         <div
        //             {...provided.draggableProps} ref={provided.innerRef}
        //             {...provided.dragHandleProps}>

        <Droppable direction="vertical" droppableId={String(menue_id)}>
            {(provided) => (
                <div className="menu-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {menuItems && (menuItems).map((menuItem, index) => {
                        return (
                            <div id="menu-item">
                                <MenuCards index={index} key={menuItem.id} id={menuItem.id} name={menuItem.name} text={menuItem.description} price={menuItem.price} />
                            </div>
                        )
                    })}
                    <MenuActionButton setFixState={setFixState} menue_id={menue_id} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        // {provided.placeholder}

        // </div>
        // )}
        // </Draggable>
    )
}

export default MenuList;
