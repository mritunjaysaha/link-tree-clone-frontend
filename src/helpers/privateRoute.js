import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../features/Auth/authSlice";
import { urls } from "../data/data";
export function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useSelector(getIsAuthenticated);
    console.log({ isAuthenticated });

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={urls.login} />
                )
            }
        />
    );
}
