import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from "react";
import { getMenuList } from "../../store/menuList"
import NavBarHome from '../../components/NavBarHome'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Home = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.session.user
    })
    const { userId } = useParams();
    const menuLists = useSelector((state) => {
        return state.menuList
    });
    const foodOrDrinks = useSelector((state) => {
        return state.menuList.foodOrDrink
    });
    const menus = useSelector((state) => {
        return state.menuList.menue
    });

    useEffect(() => {
        dispatch(getMenuList(userId));
    }, [])

    // if (!loggedInUser) return <Redirect to="/login" />;

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                Checkout button goes here
            </div>
            <div>
                {/* {menuLists && Object.values(menus).map((menu, index) => {
                    return (
                        <div menue_id={menu.id} className="full-menu-text">
                            <Card>
                                <h2>{menu.food_item}</h2>
                                {menuLists && Object.values(foodOrDrinks).map((foodOrDrink) => {
                                    return (
                                        <Card className="food-card">
                                            <CardContent className="menu-card">
                                                <Typography gutterBottom>
                                                    <h3>{foodOrDrink.name}</h3>
                                                <h4>{foodOrDrink.description}</h4>
                                                <h4>${foodOrDrink.price}</h4>
                                                </Typography>
                                                <Button>Add to Cart</Button>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </Card>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )

}

export default Home;