import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBarHome from "./components/NavBarHome";
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
import { restoreUser } from "./store/session"
import MenuList from "./components/MenuList"
import MenuCards from "./components/MenuCards"
import CreateQrCode from "./components/CreateQrCode"
import Payment from "./components/Payment"
// import ManageTables from "./components/ManageTables"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const user = await dispatch(restoreUser())
      if (!user.errors) {
        setAuthenticated(true);

      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBarHome setAuthenticated={setAuthenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/sign-up" exact={true} >
          <SignUp authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/login" exact={true}>
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/:userId" exact={true} >
          <Home authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>




        <ProtectedRoute path="/menu-list" authenticated={authenticated}>
          <MenuList />
        </ProtectedRoute>
        <ProtectedRoute path="/menu-cards" authenticated={authenticated}>
          <MenuCards />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/manage-tables/:userId" exact={true} authenticated={authenticated}>
          <ManageTables />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>

        <ProtectedRoute path="/create-menue/:userId" exact={true} authenticated={authenticated}>
          <CreateMenue />
        </ProtectedRoute>
        <ProtectedRoute path="/manage-staff/:userId" exact={true} authenticated={authenticated}>
          <ManageStaff />
        </ProtectedRoute>
        <ProtectedRoute path="/create-qr-code/:userId" exact={true} authenticated={authenticated}>
          <CreateQrCode />
        </ProtectedRoute>
        <ProtectedRoute path="/inventory/:userId" authenticated={authenticated}>
          <Inventory />
        </ProtectedRoute>
        <ProtectedRoute path="/staff/:employeeId" exact={true} authenticated={authenticated}>
          <StaffInfo />
        </ProtectedRoute>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
