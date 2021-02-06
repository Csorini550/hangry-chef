import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getTableByUser, createTable } from '../../store/table'



const ManageTables = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })


    return (
        <div>
            <h1>Manage Tables</h1>
        </div>
    )
}

export default ManageTables;