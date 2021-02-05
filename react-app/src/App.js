import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
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
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
