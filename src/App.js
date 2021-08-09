import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import { LogIn } from "./features/Auth/LogIn";
import { SignUp } from "./features/Auth/SignUp";

import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";

import { setAuthToken } from "./utils/setAuthToken";
import { setCredentials } from "./features/Auth/authSlice";
import { Admin } from "./features/Admin";

import { PrivateRoute } from "./helpers/privateRoute";

import { urls } from "./data/data";

function App() {
    const dispatch = useDispatch();

    // check for token to keep user logged in
    if (localStorage.jwtToken) {
        // set auth token header auth
        const token = localStorage.jwtToken;

        setAuthToken(token);

        // decode token and get user info and exp
        const decoded = jwt_decode(token);
        console.log({ decoded });

        // set user and isAuthenticated
        dispatch(setCredentials(decoded));

        // check for expired token
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            // TODO Logout user
            // TODO Redirect to login
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                {/* TODO Add private routes for ADMIN */}
                <Route exact path={urls.dashboard} component={Dashboard} />
                <Route exact path={urls.signup} component={SignUp} />
                <Route exact path={urls.login} component={LogIn} />
                {/* <Route exact path={urls.admin} component={Admin} /> */}
                <Switch>
                    <Route exact path={urls.admin} component={Admin} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
