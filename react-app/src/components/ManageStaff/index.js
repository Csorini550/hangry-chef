import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeByUser, createEmployee, deleteEmployee } from '../../store/employee'
import { Button, Card, Input } from "@material-ui/core";
import "./ManageStaff.css";

const ManageStaff = () => {
    const [open, setOpen] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [table_number, setTableNumber] = useState("");
    // const { userId } = useParams()
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const userId = loggedInUser.id
    const openForm = () => {
        setOpen(!open);
    };
    const closeForm = (e) => {
        setOpen(!open);
    };

    const employees = useSelector((state) => {
        return state.employee;
    });

    useEffect(() => {
        dispatch(getEmployeeByUser(userId))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            user_id: userId,
            first_name,
            last_name,
            salary,
            table_number
        }
        dispatch(createEmployee(newEmployee))
        closeForm();
    }

    const handleDelete = (employeeId) => {
        // e.preventDefault();
        dispatch(deleteEmployee(employeeId))
    }

    if (Object.keys(employees).length === 0) return null;
    if (open === true) {
        return (
            <div className="big-div2">
                <div className="container">
                    <h1>Manage Staff</h1>
                    <div className="stupid-form">
                        <Card style={{ width: "200px", margin: "10px", padding: "20px" }}>
                            <h1>New Employee</h1>
                            <form>
                                <div className="stupid-form">
                                    <Input
                                        autoFocus
                                        id=""
                                        name="First name"
                                        type="text"
                                        placeholder="First Name"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="stupid-form">
                                    <Input
                                        autoFocus
                                        id=""
                                        name="Last name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="stupid-form">
                                    <Input
                                        autoFocus
                                        id=""
                                        name="Menu Name"
                                        type="number"
                                        placeholder="Hourly Salary"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>
                                <div className="stupid-form">
                                    <Input
                                        autoFocus
                                        id=""
                                        name="Menu Name"
                                        type="number"
                                        placeholder="Table Number"
                                        value={table_number}
                                        onChange={(e) => setTableNumber(e.target.value)}
                                    />
                                </div>
                                <div className="stupid-form">
                                    <Button type="submit" className="food-add-button" onClick={handleSubmit}>Add</Button>
                                    <Button onClick={closeForm}>Cancel</Button>
                                </div>
                            </form>
                            {/* {employees && Object.values(employees).map((employee) => {
                        return (
                            <Link to={`/staff/${employee.id}`} >
                                <h3>{employee.first_name} {employee.last_name}</h3>
                            </Link>
                        )
                    })} */}
                        </Card>
                    </div>
                </div>
            </div >
        )
    } else {
        if (Object.keys(employees).length === 0) return null;
        return (
            <div className="big-div2">
                <div className="container">
                    <h1>Manage Staff</h1>
                    <div>
                        <div className="btn">
                            <Button style={{ backgroundColor: "#E9C46A" }} onClick={openForm}>Add Employee</Button>
                        </div>
                        <div style={{ columns: "3", columnGap: "20px" }}>
                            {employees && Object.values(employees).map((employee) => {
                                return (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Card style={{ width: "200px", textAlign: "center", margin: "20px", left: "50%" }}>
                                            <Link className="staff-link" to={`/staff/${employee.id}`} >
                                                <h3>{employee.first_name} {employee.last_name}</h3>
                                            </Link>
                                            <Button type='delete' value='Delete' className='Input' onClick={() => handleDelete(employee.id)}> Delete</Button>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ManageStaff;