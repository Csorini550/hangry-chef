import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Button, Input, FormLabel, Typography, Card } from "@material-ui/core";




const CartItemComp = ({ item, cart, setCart, index }) => {

    const handleDelete = (e) => {
        e.preventDefault();
        cart.splice(index, 1)
        setCart([...cart])


    }

    return (
        <div className="cart-content">
            <Card style={{ width: "300px", margin: "20px" }}>
                <Typography gutterBottom>
                    <h1>{item.name} ${item.price}</h1>
                </Typography>
                <Button onClick={handleDelete}>x</Button>
            </Card>
        </div>
    )
}

export default CartItemComp