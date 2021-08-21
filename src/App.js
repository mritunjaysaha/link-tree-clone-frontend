import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { LogIn } from "./components/Auth/LogIn";
import { SignUp } from "./components/Auth/SignUp";

import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";

import { setAuthToken } from "./utils/setAuthToken";
import { setAuth } from "./features/Auth/authSlice";
import { Admin } from "./components/Admin/index";

import { UserViewPage } from "./components/UserView";

import { PrivateRoute } from "./helpers/privateRoute";

import { urls } from "./data/data";
import { store } from "./app/store";

axios.defaults.baseURL = "http://localhost:9000/";

// check for token to keep user logged in
if (localStorage.jwtToken) {
    // set auth token header auth

    const token = localStorage.jwtToken;

    setAuthToken(token);

    // decode token and get user info and exp
    const decoded = jwt_decode(token);

    // set user and isAuthenticated
    store.dispatch(setAuth(decoded));
    // check for expired token
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        // TODO Logout user
        // TODO Redirect to login
    }
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                {/* TODO Add private routes for ADMIN */}

                <Switch>
                    <Route exact path={urls.dashboard} component={Dashboard} />
                    <Route exact path={urls.signup} component={SignUp} />
                    <Route exact path={urls.login} component={LogIn} />

                    <PrivateRoute path={urls.admin} component={Admin} />

                    <Route path="/:username" component={UserViewPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
