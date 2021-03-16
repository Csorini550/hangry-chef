import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../store/employee2'
import { getTableByEmployee } from '../../store/table'
import { getCustomerByTableId } from '../../store/customer'
import { Card } from "@material-ui/core"
import "./StaffInfo.css"
const StaffInfo = () => {
    const { employeeId } = useParams()
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const tables = useSelector(state => {
        return state.table
    })
    const customers = useSelector(state => {
        return state.customer
    })

    const employee = useSelector((state) => {
        return state.employee2;
    });
    const userId = loggedInUser.id

    const table_number = employee.table_number
        ("TABLE NUMBER!!!", table_number)


    useEffect(() => {
        dispatch(getTableByEmployee(employeeId))
        dispatch(getEmployeeById(employeeId))
    }, [])

    useEffect(() => {
        dispatch(getCustomerByTableId(table_number))
    }, [tables, employee])



    // need to get all customer reviews for this staff member
    // need to get all customer tips for this staff member
    // need to get all customer ratings for this staff member
    // need to get all customer order issues for this staff member
    // Object.values(customers) === 0 ? table_number = 1 : ""
    return (
        <div className="big-div-info">
            <div className="staff-salary">
                <h1>Employee Info</h1>
                <div className="main-info">
                    <Card style={{ width: "500px" }}>
                        <div className="card-content">
                            <h2>{employee.last_name}, {employee.first_name}</h2>
                            <h3>Salary: ${employee.salary} an hour</h3>
                            <h3>Recent tables:</h3>
                            <ul className="table-number">
                                {Object.values(tables).map((table) => {
                                    return (
                                        <li>
                                            <h4>{table.table_number} </h4>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div>
                                {customers && Object.values(customers).map((customer) => {
                                    return (
                                        <div>
                                            <h3>Customer rating: {customer.server_rating} </h3>
                                            <h3>Customer Review: </h3>
                                            <h4>{customer.server_review}</h4>
                                            <h3>Customer Tip: ${customer.tipp}</h3>
                                            {/* <h3>Total cost of meal: ${total_price}</h3> */}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default StaffInfo