import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, draggable } from 'react-beautiful-dnd'
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser, sort, deleteMenu } from '../../store/menue'
import MenuCards from '../../components/MenuCards'
import MenuList from '../../components/MenuList'
import MenuActionButton from '../../components/MenuActionButton'
import { Card, Button } from "@material-ui/core"
import MenuCreatorButton from '../../components/MenuCreatorButton'
import './CreateMenue.css'
// import { sort } from "../../store/dragDrop"
const CreateMenue = () => {
    const [menuTitle, setMenuTitle] = useState("");
    const [header, setHeader] = useState("");
    // const [] 

    const dispatch = useDispatch();
    // const { menueId } = useParams();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id

    const menuItems = useSelector((state) => {
        return state.foodOrDrink;
    });
    const menus = useSelector((state) => {
        return state.menue;
    });
    const ingredients = useSelector((state) => {
        return state.ingredients;
    });

    const handleDelete = (menuId) => {
        // e.preventDefault();
        dispatch(deleteMenu(menuId))
    };


    useEffect(() => {
        dispatch(getMenueByUser(userId));

    }, []);

    const onDragEnd = (result) => {
        //     //cancel drag item tilt here
        const { destination, source, draggableId, type } = result;
        //     //Chekcs to make sure something was actually moved to a new spot
        if (!destination) {
            return;
        }; //Card wasn't placed on a droppable area
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }; //Card start and end was same location

        dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId))

    };

    const menuName = menus[1] ? menus[1].menue_name : ""

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction="horizontal" droppableId={String(userId)}>
                {(provided) => (
                    <div {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <div className="full-menu">
                            <h1 id="menu-name">{menuName}</h1>

                            {menus && Object.values(menus).map((menu, index) => {
                                return (
                                    <div menue_id={menu.id} className="full-menu-text">
                                        <Card>
                                            <h2>{menu.food_item}</h2>
                                            <MenuList index={index} menue_id={menu.id} key={menu.id} />
                                            <Button type='delete' value='Delete' className='input' onClick={() => handleDelete(menu.id)}> Delete</Button>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                        <MenuCreatorButton />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )

}


export default CreateMenue