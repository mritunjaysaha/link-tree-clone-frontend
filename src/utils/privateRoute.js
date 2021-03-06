import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { urls } from "../data/data";

export function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useSelector((state) => state.user);

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
