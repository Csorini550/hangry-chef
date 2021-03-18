import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { createCustomer } from "../../store/customer"
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import { Button, Input, FormLabel, Typography } from "@material-ui/core";
import ReactStars from "react-rating-stars-component"
import CartItemComp from "../../components/CartItemComp"
import "./Cart.css"


const Cart = ({ items, cart, setCart }) => {

    const [open, setOpen] = useState(false);
    const [server_review, setServerReview] = useState("");
    const [server_rating, setServerRating] = useState(0);
    const [order_issue, setOrderIssue] = useState("");
    const [table_number, setTableNumber] = useState("");
    const dispatch = useDispatch();
    const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
    const [priceBeforeTip, setPriceBeforeTip] = useState(cartTotal)
    const history = useHistory();
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
        history.push("/payment")
    }
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };
    const ratingChanged = (newRating) => {
        setServerRating(newRating)
    };


    //Help
    // handleDelete = itemId => {
    //     const items = items.filter(item => item.id !== itemId);
    //     setCart({ items: items });
    // };


    if (open === true) {
        return (
            <div className="cart-container">
                <div className="cart-card">
                    <h1>Cart</h1>
                    {cart?.map((item, index) => {
                        return (
                            <CartItemComp item={item} setCart={setCart} cart={cart} index={index} />
                        )
                    })
                    }
                    <h2>Total Price: ${cartTotal}</h2>
                </div>
                <div className="float-right">
                    <form id="cart-checkout">
                        <div>
                            <FormLabel className="form-label">
                                Table Number
                   <Input
                                    style={{ margin: "20px" }}
                                    value={table_number}
                                    type="number"
                                    multiple
                                    min="0"
                                    onChange={(e) => setTableNumber(e.target.value)} />
                            </FormLabel>
                        </div>
                        <div>
                            <FormLabel className="form-label">
                                How was your server?
                   <Input
                                    style={{ margin: "20px" }}
                                    value={server_review}
                                    type="text"
                                    multiple
                                    onChange={(e) => setServerReview(e.target.value)} />
                            </FormLabel>
                        </div>
                        <div>
                            <FormLabel className="form-label rating">
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
                                {/* <Input
                            style={{ margin: "20px" }}
                            value={server_rating}
                            type="number"
                            multiple
                            onChange={(e) => setServerRating(e.target.value)} /> */}

                            </FormLabel>
                        </div>
                        <div>
                            <FormLabel className="form-label">
                                Tip: $
                   <Input
                                    style={{ margin: "20px" }}
                                    value={tipp}
                                    type="number"
                                    min="0"
                                    multiple
                                    onChange={(e) => setTipp(e.target.value)} />
                            </FormLabel>
                        </div>
                        <div>
                            <FormLabel className="form-label">
                                Issue with order
                   <Input
                                    style={{ margin: "20px" }}
                                    value={order_issue}
                                    type="text"
                                    multiple
                                    onChange={(e) => setOrderIssue(e.target.value)} />
                            </FormLabel>
                        </div>
                        <div>
                            <Button onClick={handlePurchase}>Continue to Payment</Button>
                            <Button onClick={closeForm}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div >
        )
    } else {
        return (
            <div className="btn-check">
                <Button style={{ backgroundColor: "#E9C46A" }} onClick={openForm} id="add-button">
                    Checkout
            </Button >
            </div>
        )
    }
}

export default Cart;