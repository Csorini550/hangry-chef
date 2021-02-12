import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeByUser, createEmployee } from '../../store/employee'
import Button from "@material-ui/core/Button";

const ManageStaff = () => {
    const [open, setOpen] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [table_number, setTableNumber] = useState("");
    const { userId } = useParams()
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
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

    if (Object.keys(employees).length === 0) return null;
    if (open === true) {
        return (
            <div>
                <h1>Manage Staff</h1>
                <div>

                    <form>
                        <div className="stupid-form">
                            <input
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
                            <input
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
                            <input
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
                            <input
                                autoFocus
                                id=""
                                name="Menu Name"
                                type="number"
                                placeholder="What table is this employee assigned to"
                                value={table_number}
                                onChange={(e) => setTableNumber(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="food-add-button" onClick={handleSubmit}>Add</Button>
                        <Button onClick={closeForm}>Cancel</Button>
                    </form>
                    {/* {employees && Object.values(employees).map((employee) => {
                        return (
                            <Link to={`/staff/${employee.id}`} >
                                <h3>{employee.first_name} {employee.last_name}</h3>
                            </Link>
                        )
                    })} */}
                </div>
            </div >
        )
    } else {
        return (
            <div>
                <h1>Manage Staff</h1>
                <div>
                    <button onClick={openForm}>Add Employee</button>
                    {employees && Object.values(employees).map((employee) => {
                        return (
                            <Link to={`/staff/${employee.id}`} >
                                <h3>{employee.first_name} {employee.last_name}</h3>
                            </Link>
                        )
                    })}
                </div>
            </div >
        )
    }
}

export default ManageStaff;