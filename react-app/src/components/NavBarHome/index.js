import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";


const NavBarHome = () => {

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const dispatch = useDispatch();

    return (
        <>
            <div className="nav-main">
                <div className="nav-body">
                    <Link to="/create-menue">
                        <h3>Create a menue</h3>
                    </Link>
                    <Link to="manage-staff">
                        <h3>Manage Staff</h3>
                    </Link>
                    <Link to="manage-tables">
                        <h3>Manage Tables</h3>
                    </Link>
                    <Link to="Inventory">
                        <h3>Inventory</h3>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default NavBarHome;