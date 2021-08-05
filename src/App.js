import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogIn } from "./features/Auth/LogIn";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={LogIn} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
