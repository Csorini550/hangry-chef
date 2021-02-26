import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { createCustomer } from "../../store/customer"
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import { Button, Input, FormLabel, Typography } from "@material-ui/core";
import ReactStars from "react-rating-stars-component"



const Cart = ({ items, cart, setCart }) => {

    const [open, setOpen] = useState(false);
    const [server_review, setServerReview] = useState("");
    const [server_rating, setServerRating] = useState(0);
    const [order_issue, setOrderIssue] = useState("");
    const [table_number, setTableNumber] = useState("");
    const dispatch = useDispatch();
    const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
    const [priceBeforeTip, setPriceBeforeTip] = useState(cartTotal)

    const twentyPercent = priceBeforeTip * .20;
    const [tipp, setTipp] = useState("");
    const totalWithTip = cartTotal + tipp
    // setTipp(twentyPercent)
    const [total_price, setTotalPrice] = useState(cartTotal);


    const loggedInUser = useSelector(state => {
        return state.session.user;
    });
    const handlePurchase = (e) => {
        e.preventDefault();
        // setTotalPrice(totalPrice)
        const items = {
            tipp,
            total_price,
            server_review,
            server_rating,
            order_issue,
            table_number
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
    const ratingChanged = (newRating) => {
        // newRating.target.value
        setServerRating(newRating)
        // console.log(newRating);
    };


    if (open === true) {
        return (
            <div>
                <h1>Cart</h1>
                <div>
                    {items && items.map((item) => {
                        return (
                            <Card>
                                <Typography gutterBottom>
                                    <h1>{item.name} ${item.price}</h1>
                                </Typography>
                                <Button >x</Button>
                            </Card>

                        )
                    })
                    }
                    <h2>Total Price: ${cartTotal}</h2>
                </div>
                <form>
                    <FormLabel>
                        Table Number
                   <Input
                            style={{ margin: "20px" }}
                            value={table_number}
                            type="number"
                            multiple
                            onChange={(e) => setTableNumber(e.target.value)} />
                    </FormLabel>
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
                        <ReactStars
                            count={5}
                            value={server_rating}
                            color="gray"
                            isHalf={true}
                            onChange={ratingChanged}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            edit={true}
                        />
                        <Input
                            style={{ margin: "20px" }}
                            value={server_rating}
                            type="number"
                            multiple
                            onChange={(e) => setServerRating(e.target.value)} />

                    </FormLabel>

                    <FormLabel>
                        Tip: $
                   <Input
                            style={{ margin: "20px" }}
                            value={tipp}
                            type="number"
                            multiple
                            onChange={(e) => setTipp(e.target.value)} />
                    </FormLabel>
                    <FormLabel>
                        Issue with order
                   <Input
                            style={{ margin: "20px" }}
                            value={order_issue}
                            type="text"
                            multiple
                            onChange={(e) => setOrderIssue(e.target.value)} />
                    </FormLabel>

                    <Button onClick={handlePurchase}>Continue to Payment</Button>
                </form>
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