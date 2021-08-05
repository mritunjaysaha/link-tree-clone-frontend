import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogIn } from "./features/Auth/LogIn";
import { Dashboard } from "./components/Dashboard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Dashboard />

                <Switch>
                    <Route exact path="/login" component={LogIn} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
