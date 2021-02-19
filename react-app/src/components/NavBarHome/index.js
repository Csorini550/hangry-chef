import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Dropdown from "../../components/Dropdown"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/menu';
import "./NavBarHome.css"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const NavBarHome = ({ setAuthenticated }) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [dropdown, setDropdown] = useState(false);

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const userId = loggedInUser.id
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className={classes.root}>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link to={`/create-menue/${userId}`} id="nav-link">
                                    Create Menu
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link to={`/manage-staff/${userId}`} id="nav-link">
                                    Manage Staff
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link to={`/manage-tables/${userId}`} id="nav-link">
                                    Manage Tables
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link to={`/inventory/${userId}`} id="nav-link">
                                    Inventory
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link to={`/create-qr-code`} id="nav-link">
                                    Create QR Code
                        </Link>
                            </Typography>
                        </div>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <mdiv
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}><Dropdown setAuthenticated={setAuthenticated} /></MenuItem>

                                </mdiv>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>

            {/* <div className="nav-main">
                <div className="user-dropdown">
                    <button id="profile-button" onClick={() => setDropdown(!dropdown)}>
                        <div className="profile-icon-container">
                            <img id="profile" src="https://img.icons8.com/ios-glyphs/30/000000/menu.png" />
                            <img id="menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAC+UlEQVRIie2Wv2sVWRTHP+fOZC2eQoisRA3xVyHCbpXCWgsLA5oIwcI0yZsZn/vAtdptxB+lNgpCmDcTbPzRiYkoFv4FCukUhGDwtxYWiyJh1333bJF5MvPezLyXsIiF32bmnl/fOfeeO+fAD3wjSK+GQRAMi8hhYFRVtwNDieq1iDxX1buu687PzMy8+l+Ia7XaVmvtGaAKOF3MLXDLGPNHGIbP10wcBMEYcA1Y3+0D2/BJVSfjOL5TZFCYge/7v4vIVWDdKkkB1onI0ZGRkb8WFhYe5hnkZpxkegswayBNw6rqeF7mHYE9zxtiZXuLSBdFZHR5eXm9tXZQRG6UEBsRuT49Pb2lXeF2WBpznuIz/SIio41GYzFZfwYmPc+7aoy5D/yU47PBdd3zgJ8WZrY6CIJhYImCs1fV+TiOx/J0vu/PJdctD01r7fbZ2dnXLUFmOxPHwoIzxiwW6YCnJTrHGJP5qAyxqh4scUZVNxbpRGRTF99M7PYC2lnmDPStUYeI7Coj3tzFecvExETHUSSyrWW+QKayV3VPVXV/f39/R3ENDAyMA/tWE6ud+F03BxG5WK/Xv551vV7fqKoXeuB6W0a81EOAnc1m89fWInnvVhuo6rMy4ns9EL+w1j5uLZL3XlphJnaG2HXdeaCZ4/QPcBMYr1Qqe6Io+tBSRFH0oVKp7FbVI4nNlxz/f1U187/uaBK+78+KSDUlequqB+I4ftItJYBarfaLtfYBMJgSR1EUHU/bdVS14zhngU+ttaqe6JUUIAzDx8CJlOgjcK7droM4DMM3qjrJyjSBMWZbr6QpDCdPKyKTURR13JbCCSQIgpPAJVZa221VPRVF0csytmq1us1xnMvAWEJ6qtFoXMmzLR19fN8/JCLXgQ3A38Ccqs65rvuo2Wy+B3AcZ9Bau1dVx4HDrLTGj6p6LI7ju0Wxuw57U1NTP/f19Z0GfiOnf7fBAjeAP/O2d1XELXieN5S0tlFgB6nxVlWXgHuqeifdc3/gu8B/DaADQCx7qmIAAAAASUVORK5CYII="></img>
                        </div>
                    </button>
                    {dropdown ? <Dropdown setAuthenticated={setAuthenticated} /> : null}
                </div>
                {loggedInUser !== null &&
                    <div className="nav-body">
                        <Link to={`/create-menue/${userId}`}>
                            <h3>Create a Menu</h3>
                        </Link>
                        <Link to={`/manage-staff/${userId}`}>
                            <h3>Manage Staff</h3>
                        </Link>
                        <Link to={`/manage-tables/${userId}`}>
                            <h3>Manage Tables</h3>
                        </Link>
                        <Link to={`/inventory/${userId}`}>
                            <h3>Inventory</h3>
                        </Link>
                    </div>
                }
            </div> */}
        </>
    )

}

export default NavBarHome;