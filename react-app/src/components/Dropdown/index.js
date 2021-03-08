import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import Login from "../../components/Login"
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
        <LogoutButton setAuthenticated={setAuthenticated} />
        <button>
          <Link to="/login" exact={true} activeClassName="active">
            Login
          </Link>
        </button>
      </div>
      {/* <Login setAuthenticated={setAuthenticated} authenticated={authenticated} /> */}
      {/* </li> */}
      {/* </ul> */}
    </nav>
  );
}

export default Dropdown;