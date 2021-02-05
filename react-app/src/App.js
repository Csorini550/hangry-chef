import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import SignUpModal from "./components/SignUpModal"
import { authenticate } from "./services/auth";
import CreateMenue from "./components/CreateMenue";
import ManageStaff from "./components/ManageStaff"
import ManageTables from "./components/ManageTables"
import Inventory from "./components/Inventory"
import Home from "./components/Home"
import StaffInfo from "./components/StaffInfo"


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUp authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/create-menue" exact={true} authenticated={authenticated}>
          <CreateMenue />
        </ProtectedRoute>
        <ProtectedRoute path="/manage-staff" exact={true} authenticated={authenticated}>
          <ManageStaff />
        </ProtectedRoute>
        <ProtectedRoute path="/manage-tables" exact={true} authenticated={authenticated}>
          <ManageTables />
        </ProtectedRoute>
        <ProtectedRoute path="/inventory" exact={true} authenticated={authenticated}>
          <Inventory />
        </ProtectedRoute>
        <ProtectedRoute path="/:userId/staff/info/:employeeId" exact={true} authenticated={authenticated}>
          <StaffInfo />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
