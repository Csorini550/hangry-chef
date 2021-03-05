import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Dropdown from "../../components/Dropdown"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

const NavBarHome = ({ authenticated, setAuthenticated }) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    // const [authenticated, setA] = React.useState(true);
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
    // <LogoutButton setAuthenticated={setAuthenticated} />
    return (
        <>
            <div className={classes.root}>
                {/* <FormGroup>
                    <FormControlLabel
                        control={<Switch setAuthenticated={setAuthenticated} onChange={handleChange} aria-label="login switch" />}
                        label={authenticated ? 'Logout' : 'Login'}
                    />
                </FormGroup> */}
                <AppBar position="static">
                    <Toolbar style={{ backgroundColor: "#264653", color: "#E9C46A" }}>
                        <IconButton edge="start" style={{ color: "#E9C46A" }} className={classes.menuButton} color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/${userId}`} exact={true} >
                                    Home
          </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/create-menue/${userId}`} id="nav-link">
                                    Create Menu
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/manage-staff/${userId}`} id="nav-link">
                                    Manage Staff
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/manage-tables/${userId}`} id="nav-link">
                                    Manage Tables
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/inventory/${userId}`} id="nav-link">
                                    Inventory
                        </Link>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" className={classes.title} style={{ margin: "30px" }}>
                                <Link style={{ color: "#E9C46A" }} to={`/create-qr-code/${userId}`} id="nav-link">
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
                                <div
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

                                </div>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )

}

export default NavBarHome;