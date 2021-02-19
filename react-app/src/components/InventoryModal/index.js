import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import { Button, Input, FormLabel } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { editInventory } from "../../store/inventory"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const InventoryModal = ({ inventory_Id, name, quant, price }) => {
    const dispatch = useDispatch();
    const [inventoryId, setInventoryId] = useState(inventory_Id)
    const [food_item, setFoodItem] = useState(name);
    const [quantity, setQuantity] = useState(quant);
    const [market_price, setMarket_price] = useState(price);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const inventoryId = inventory_Id;
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEdit = (inventoryId, food_item, quantity, market_price) => {
        // e.preventDefault();
        dispatch(editInventory(inventoryId, food_item, quantity, market_price))
    }

    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                Edit
      </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Card>
                            <form onSubmit={handleEdit} style={{ backgroundColor: "#264653" }}>

                                <FormLabel className="create-venue">
                                    Name of new item
                   <Input
                                        style={{ margin: "20px" }}
                                        value={food_item}
                                        type="text"
                                        multiple
                                        onChange={(e) => setFoodItem(e.target.value)} />
                                </FormLabel>
                                <FormLabel className="create-venue">
                                    Current quantity:
                   <Input
                                        style={{ margin: "20px" }}
                                        value={quantity}
                                        type="number"
                                        multiple
                                        onChange={(e) => setQuantity(e.target.value)} />
                                </FormLabel>
                                <FormLabel className="create-venue">
                                    Market price:
                   <Input
                                        style={{ margin: "20px" }}
                                        value={market_price}
                                        type="number"
                                        multiple
                                        onChange={(e) => setMarket_price(e.target.value)} />
                                </FormLabel>
                                <Button style={{ backgroundColor: "#2A9D8F" }} type="submit">Confirm </Button>
                            </form>
                        </Card >
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default InventoryModal;