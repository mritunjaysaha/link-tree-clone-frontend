import { useState } from "react";

import axios from "axios";

import { MUIModal } from "../../Modal/muiModal";
import { SelectImageModal } from "./selectImageModal";
import { useSelector, useDispatch } from "react-redux";
import { pickModalReducer } from "../../../features/Admin/appearance/appearanceSlice";
import { removePhoto } from "../../../features/Auth/authSlice";
import { convertToBinary } from "../../../utils/convertToBinary";
import { MUITextFieldBorderBottom } from "../../Form/input";
import { TextareaAutosize } from "@material-ui/core";

import styles from "./appearance.module.scss";
import placeholder from "../../../assets/placeholder.png";
import { LoadingSpinner } from "../../Loader";

function Profile() {
    const max = 80;

    const { pickModal } = useSelector((state) => state.modal);
    const {
        photo,
        _id,
        profileTitle: oldProfileTitle,
        bio: oldBio,
    } = useSelector((state) => state.user);

    const [profileTitle, setProfileTitle] = useState(oldProfileTitle);
    const [bio, setBio] = useState(oldBio);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    function handleProfileTitle(e) {
        setProfileTitle(e.target.value);
    }

    function handleBio(e) {
        if (bio.length <= 80) {
            setBio(e.target.value);
        }
    }

    function handleModal() {
        dispatch(pickModalReducer());
    }

    async function handleRemove() {
        setIsLoading(true);
        await axios
            .delete(`/api/user/photo/${_id}`)
            .then((res) => {
                dispatch(removePhoto());
                setIsLoading(false);
            })
            .catch((err) => console.log("Failed to remove photo"));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = { profileTitle, bio };

        await axios
            .put(`/api/user/${_id}`, data)
            .then((res) => {})
            .catch((err) =>
                console.log("failed to update profile title and bio")
            );
    }

    return (
        <>
            <section className={styles.profileSection}>
                <p>profile</p>
                <div className={styles.profileInner}>
                    <figure>
                        <img
                            src={!!photo ? convertToBinary(photo) : placeholder}
                            alt=""
                        />
                        <figcaption>
                            <button onClick={handleModal}>Pick an image</button>
                            <button
                                onClick={handleRemove}
                                className={styles.loaderContainer}
                            >
                                {!isLoading ? "Remove" : <LoadingSpinner />}
                            </button>
                        </figcaption>
                    </figure>
                    <div className={styles.inputDiv}>
                        <MUITextFieldBorderBottom
                            fullWidth
                            variant="filled"
                            type="text"
                            name="name"
                            label="Profile Title"
                            value={profileTitle}
                            onChange={handleProfileTitle}
                            onBlur={handleSubmit}
                        />
                        <p>Bio</p>
                        <TextareaAutosize
                            name="bio"
                            placeholder="Empty"
                            minRows="5"
                            value={bio}
                            onChange={handleBio}
                            className={styles.textarea}
                            onBlur={handleSubmit}
                        />
                        <p className={styles.wordCountP}>
                            {bio.length}/{max}
                        </p>
                    </div>
                </div>
            </section>
            <MUIModal
                handleClose={handleModal}
                open={pickModal}
                component={SelectImageModal}
            />
        </>
    );
}

export function Appearance() {
    return (
        <section className={styles.appearanceSection}>
            <Profile />
        </section>
    );
}
