import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getTableByUser, createTable, deleteTable } from '../../store/table'
import { getEmployeeByUser } from '../../store/employee'
import { makeStyles } from '@material-ui/core/styles';
import { Select, Button, FormLabel, InputLabel, FormControl, Input, MenuItem } from '@material-ui/core';
import "./ManageTables.css"

const ManageTables = () => {
    const [table_number, setTableNumber] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.session.user;
    })
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const { userId } = useParams();

    const tables = useSelector(state => {
        return state.table;
    })
    const employees = useSelector(state => {
        return state.employee;
    })

    useEffect(() => {
        dispatch(getTableByUser(userId));
        dispatch(getEmployeeByUser(userId))
    }, [])

    const useStyles = makeStyles((theme) => ({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 70,
        },
    }));
    const handleDelete = (tableId) => {
        // e.preventDefault();
        dispatch(deleteTable(tableId))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTable = {
            table_number,
            user_id: userId,
            employee_id: employeeId

        }
        dispatch(createTable(newTable))
    }

    const tablesArray = Object.values(tables)
    console.log("THis IS TABleARRAY!!! ", tablesArray)
    const tableNumberMatch = (employees, tables) => {
        const tablesArray = tables && Object.values(tables)

        const employeesArray = employees && Object.values(employees)

        if (employeesArray.table_number === tablesArray.table_number) {
            // return (
            //     <div>
            //         <div className="table">
            //             <h2>{table.table_number}</h2>
            //         </div>
            //         <h3>{employee.first_name} {employee.last_name}</h3>
            //     </div>
            // )
        }


    }


    return (
        <div>
            <div>
                <h1>Manage Tables</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <FormLabel className="create-venue" style={{ margin: "20px" }}>
                    Table number
                   <Input
                        value={table_number}
                        type="number"
                        multiple
                        style={{ margin: "20px" }}
                        onChange={(e) => setTableNumber(e.target.value)} />
                </FormLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                >
                    {employees && Object.values(employees).map((employee) => {
                        return (
                            <MenuItem value={employee.id}>{employee.first_name}, {employee.last_name}</MenuItem>
                        )
                    })}
                </Select>
                <Button style={{ margin: "20px", backgroundColor: "#E9C46A" }} type="submit" > Create</Button>
            </form>
            <div className="table-main">
                {tables && Object.values(tables).map((table) => {
                    return (
                        <div>
                            <div className="table">
                                <h2>{table.table_number}</h2>
                            </div>
                            <Button type='delete' value='Delete' className='input' onClick={() => handleDelete(table.id)}> Delete Table</Button>
                        </div>
                    )

                })}
            </div>
        </div >
    )
}

export default ManageTables;