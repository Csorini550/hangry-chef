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
import { common } from '@material-ui/core/colors';
import Cart from "../../components/Cart"
import { addToCart } from "../../store/cart"
import AddToCart from "../../components/AddToCart"

const Home = () => {
    const [cart, setCart] = useState([])
    const dispatch = useDispatch();
    const { userId } = useParams();
    // const menuList = useSelector((state) => {
    //     return state.menuList
    // });


    const menuLists = useSelector((state) => {
        return JSON.parse(state.menuList.menu_list)
    });
    const foodOrDrinks = useSelector((state) => {
        return JSON.parse(state.menuList.food_or_drink_list)
    });

    useEffect(() => {
        dispatch(getMenuList(userId));
    }, [])

    const handleAddItem = (item) => {
        setCart([...cart, item])
        // e.preventDefault();
        // dispatch(addToCart(food.name, food.price))

    }


    return (
        <div>
            <h1>Home Page</h1>
            <div>

            </div>
            <div>
                <Cart items={cart} />
                {menuLists && Object.values(menuLists).map((menuList, index) => {
                    return (
                        <div className="full-menu-text">
                            <Card>
                                <h2>{menuList.food_item}</h2>
                                {foodOrDrinks[menuList.id].map((food) => {
                                    return (
                                        <Card style={{ margin: "15px" }} className="food-card">
                                            <CardContent className="menu-card">
                                                <Typography gutterBottom>
                                                    <h3>{food.name}</h3>
                                                    <h4>{food.description}</h4>
                                                    <h4>${food.price}</h4>
                                                </Typography>
                                            </CardContent>
                                            {/* <AddToCart items={food.name, food.price} /> */}
                                            <Button onClick={() => handleAddItem({ [food.id]: { name: food.name, price: food.price } })}>Add to Cart</Button>
                                        </Card>
                                    )

                                })}

                            </Card>
                        </div>
                    )
                })}
            </div>
        </div >
    )

}

export default Home;