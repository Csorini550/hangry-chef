import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeByUser } from '../../store/employee'


const ManageStaff = () => {
    const { userId } = useParams()
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })

    const employees = useSelector((state) => {
        return state.employee;
    });

    useEffect(() => {
        dispatch(getEmployeeByUser(loggedInUser.id))
    }, [])


    if (Object.keys(staff).length === 0) return null;
    return (
        <div>
            <h1>Manage Staff</h1>
            <div>
                {employees.map((employee) => {
                    return (
                        // Why wont this work with string interpulation
                        // /:userId/staff/info/:employeeId
                        <Link to="/{employee.id}" >
                            <h3>{employee.frist_name} {employee.last_name}</h3>
                        </Link>
                    )
                })}
            </div>
        </div >
    )
}

export default ManageStaff;