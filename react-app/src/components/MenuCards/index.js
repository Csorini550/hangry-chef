import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { getFoodOrDrink, createFoodOrDrink } from '../../store/foodOrDrink'
import { getIngredientsByUser } from '../../store/ingredient'
import { createMenue, getMenueByUser } from '../../store/menue'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import './MenuCards.css'

const MenuCards = ({ text, price, name, menue_id }) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.session.user;
    });
    const userId = loggedInUser.id;
    const menus = useSelector((state) => {
        return state.menue;
    })



    const ingredients = useSelector((state) => {
        return state.intgredient
    })
    useEffect(() => {
        // dispatch(getFoodOrDrink(userId));
        // dispatch(getIngredientsByUser(userId));
        dispatch(getMenueByUser(userId));
        // dispatch(createFoodOrDrink(foodOrDrink))
        // dispatch(createMenue(menueArray))
    }, [])



    return (
        <Card className="food-card">
            <CardContent className="menu-card">
                <Typography gutterBottom>
                    <h3>{name}</h3>
                    <h4>{text}</h4>
                    <h4>${price}</h4>
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Customize</Button>
            </CardActions>
        </Card>
    )
}

export default MenuCards;