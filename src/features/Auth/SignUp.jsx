import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function SignUp() {
    const [user, setUser] = useState({
        email: "newuser@test.com",
        name: "newuser",
        password: "123456",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setUser((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("http://localhost:9000/api/signup", user)
            .then((res) => {
                console.log("signup", res.data);
            })
            .catch((err) => console.log(err));
    }

    // TODO Update backend schema for username
    // TODO Add backend validation to check username

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign up with email</button>
            </form>
            <hr />
            <div>
                <Link to="/login">Already have an account?</Link>
            </div>
        </section>
    );
}
