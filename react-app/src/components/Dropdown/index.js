import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import Login from "../../components/Login"
import { Button, Card } from "@material-ui/core"
import "./Dropdown.css"


const Dropdown = ({ authenticated, setAuthenticated }) => {
  const loggedInUser = useSelector(state => {
    return state.session.user;
  })
  const userId = loggedInUser.id

  return (
    <nav>
      {/* <ul>
        <li>
          <NavLink to={`/${userId}`} exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
      {/* <li> */}
      <div className="dropdown-container">
        <Card>
          <LogoutButton setAuthenticated={setAuthenticated} />
          <Button>
            <Link style={{ textDecoration: "none" }} to="/login" exact={true} activeClassName="active">
              Login
          </Link>
          </Button>
        </Card>
      </div>
      {/* <Login setAuthenticated={setAuthenticated} authenticated={authenticated} /> */}
      {/* </li> */}
      {/* </ul> */}
    </nav>
  );
}

export default Dropdown;