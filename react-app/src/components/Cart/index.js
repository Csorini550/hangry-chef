import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { createCustomer } from "../../store/customer"
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import { Button, Input, FormLabel, Typography } from "@material-ui/core";



const Cart = (items) => {

    const [open, setOpen] = useState(false);
    const [tipp, setTipp] = useState("");
    const [total_price, setTotalPrice] = useState("");
    const [server_review, setServerReview] = useState("");
    const [server_rating, setServerRating] = useState("");
    const [order_issue, setOrderIssue] = useState("");
    const dispatch = useDispatch();


    const loggedInUser = useSelector(state => {
        return state.session.user;
    });
    console.log("my Items", items)
    const handlePurchase = (e) => {
        e.preventDefault();
        const items = {
            tipp,
            total_price,
            server_review,
            server_rating,
            order_issue
        }
        dispatch(createCustomer(items))
        closeForm();
    }
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };

    if (open === true) {
        return (
            <div>
                {items && items.map((item) => {
                    return (
                        <Card>
                            <Typography gutterBottom>
                                <h1>{item.name}</h1>
                            </Typography>
                        </Card>
                    )
                })
                }
                <form>
                    <FormLabel>
                        How was your server?
                   <Input
                            style={{ margin: "20px" }}
                            value={server_review}
                            type="text"
                            multiple
                            onChange={(e) => setServerReview(e.target.value)} />
                    </FormLabel>
                    <FormLabel>
                        Server Rating
                   <Input
                            style={{ margin: "20px" }}
                            value={server_rating}
                            type="number"
                            multiple
                            onChange={(e) => setServerReview(e.target.value)} />
                    </FormLabel>
                    {/* <FormLabel>
                        Total price
                   <Input
                            style={{ margin: "20px" }}
                            value={total_price}
                            type="number"
                            multiple
                            onChange={(e) => setServerReview(e.target.value)} />
                    </FormLabel> */}
                    <FormLabel>
                        Issue with order
                   <Input
                            style={{ margin: "20px" }}
                            value={order_issue}
                            type="text"
                            multiple
                            onChange={(e) => setServerReview(e.target.value)} />
                    </FormLabel>

                    <Button onClick={handlePurchase}>Continue to Payment</Button>
                </form>
                <h1>Cart</h1>
            </div >
        )
    } else {
        return (

            <Button style={{ backgroundColor: "red" }} onClick={openForm} id="add-button">
                Checkout
            </Button >
        )
    }
}

export default Cart;