import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserView({ username }) {
    const [user, setUser] = useState({
        username: "",
        photo: [],
        links: [],
        bio: "",
        profileTitle: "",
        socialLinks: [],
    });

    useEffect(() => {
        if (username) {
            axios
                .get(`/api/user/${username}`)
                .then((res) => {
                    setUser((prev) => ({ ...prev, ...res.data.user }));
                })
                .catch((err) => console.log(err.message));
        }
    }, [username]);

    return (
        <section>
            {/* User image */}
            {console.log("here", { user })}
            <picture>
                <img
                    src={
                        user.photo.length
                            ? new Buffer(user.photo.data.data)
                            : ""
                    }
                    alt={username ? username : ""}
                />
            </picture>
            {/* profile title */}
            <p>{user.profileTitle ? user.profileTitle : username}</p>
            {/* bio */}
            {user.bio ? <p>{user.bio}</p> : ""}
            {/* links */}
            {user.links.length ? <p>{JSON.stringify(user.links)}</p> : ""}
            {/*TODO: social icons */}
        </section>
    );
}

export function UserViewPage() {
    const { username } = useParams();

    return (
        <>
            {!username ? (
                <section>User not found</section>
            ) : (
                <UserView username={username} />
            )}
        </>
    );
}
