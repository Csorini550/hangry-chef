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
import { sort } from "../../store/dragDrop"
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

        dispatch(sort(source.droppableId, destination.droppableID, source.index, destination.index, draggableId))

        // //If list order changes the below code block runs
        // if (type === "list") {
        //     const newListOrder = Array.from(boardOrg.listOrder);
        //     newListOrder.splice(source.index, 1);
        //     newListOrder.splice(destination.index, 0, draggableId);
        //     const newContext = {
        //         ...boardOrg,
        //         listOrder: newListOrder,
        //     };
        //     setBoardOrg(newContext);
        //     saveBoard(newContext);
        //     return;
        // };

        // // Moving inside the same list:
        // const start = boardOrg.lists[source.droppableId];
        // const finish = boardOrg.lists[destination.droppableId]

        // if (start === finish) {
        //     const newCardIds = Array.from(start.cardIds)
        //     newCardIds.splice(source.index, 1);
        //     newCardIds.splice(destination.index, 0, draggableId);

        //     const newList = {
        //         ...start,
        //         cardIds: newCardIds,
        //     };

        //     const newContext = {
        //         ...boardOrg,
        //         lists: {
        //             ...boardOrg.lists,
        //             [newList.id]: newList,
        //         },
        //     };
        //     setBoardOrg(newContext);
        //     saveBoard(newContext);
        //     return;
        // };

        // // Moving from list to list:
        // const startCardIds = Array.from(start.cardIds);
        // startCardIds.splice(source.index, 1);
        // const newStart = {
        //     ...start,
        //     cardIds: startCardIds,
        // };

        // const finishCardIds = Array.from(finish.cardIds);
        // finishCardIds.splice(destination.index, 0, draggableId);
        // const newFinish = {
        //     ...finish,
        //     cardIds: finishCardIds,
        // };
        // const newContext = {
        //     ...boardOrg,
        //     lists: {
        //         ...boardOrg.lists,
        //         [newStart.id]: newStart,
        //         [newFinish.id]: newFinish,
        //     },
        // };
        // setBoardOrg(newContext);
        // saveBoard(newContext);
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