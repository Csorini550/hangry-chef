import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../store/employee'
import { getTableByEmployee } from '../../store/table'

const StaffInfo = () => {
    const { employeeId } = useParams()
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    console.log(employeeId)
    const employee = useSelector((state) => {
        return state.employee;
    });
    const userId = loggedInUser.id

    useEffect(() => {
        dispatch(getEmployeeById(employeeId))
        dispatch(getTableByEmployee(employeeId))
        dispatch()
    }, [])

    // need to get all customer reviews for this staff member
    // need to get all customer tips for this staff member
    // need to get all customer ratings for this staff member
    // need to get all customer order issues for this staff member
    return (
        <div>
            <h1>Employee Info</h1>
            <div>
                <h2>{employee.last_name}, {employee.first_name}</h2>
            </div>
            <div>
                <h3>Salary: ${employee.salary} an hour</h3>

            </div>
        </div>
    )
}

export default StaffInfo