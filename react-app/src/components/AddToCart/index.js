import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { createCustomer } from "../../store/customer"
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';
import { Button, Input, FormLabel, Typography } from "@material-ui/core";

const AddToCart = (items) => {
    const [open, setOpen] = useState(false);

    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };

    // if (open === true) {
    return (
        <div>
            {/* {items.map((item) => {
                return (
                    <div>
                        <h2>{item.name}</h2>
                        <h2>{item.price}</h2>
                    </div>
                )
            })} */}
        </div>
    )
    // } else {
    //     return (

    //         <Button style={{ backgroundColor: "red" }} onClick={openForm} id="add-button">
    //             ViewCart
    //         </Button >
    //     )
    // }

}

export default AddToCart;
