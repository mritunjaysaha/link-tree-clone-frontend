import { useState } from "react";

import { withStyles } from "@material-ui/core";
import { TextField, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

import { ImageModal, MUIModal } from "./appearanceModals";
import { useSelector, useDispatch } from "react-redux";
import { pickModalReducer } from "../../../features/Admin/appearance/appearanceSlice";
import { removePhoto } from "../../../features/Auth/authSlice";
import { convertToBinary } from "../../../utils/convertToBinary";
import styles from "./appearance.module.scss";

// replace these with styles variables from styles/abstract/variables.scss
const lightGrey = "#dce0e2";
const lightGrey1 = "#696e74";
const error = "red";
const black = "#131415";
const green = "#39E09B";

const MUITextField = withStyles({
    root: {
        "& .MuiFormLabel-root": {
            fontSize: "1.6rem",
            textTransform: "capitalize",
        },
        "& .MuiInputBase-input": {
            fontSize: "1.6rem",
            lineHeight: "2.1rem",
        },
        "& .MuiFilledInput-root": {
            background: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: "1.6rem",
        },
        "& .MuiFilledInput-input": {
            paddingLeft: "0",
            marginBottom: "1rem",
            borderBottom: `0.1rem solid ${lightGrey}`,
            color: `${black}`,
            "&:focus-within": {
                border: "none",
                borderBottom: `0.1rem solid ${green}`,
            },
            "&:invalid": {
                border: `0.1rem solid ${error}`,
            },
        },
        "& .MuiFilledInput-underline": {
            "&::before": {
                border: "none",
            },
            "&::after": {
                border: "none",
            },
        },
        "& .MuiInputLabel-shrink": {
            paddingLeft: "0",
            color: `${lightGrey1}`,
        },
        "& .MuiFormHelperText-root": {
            marginTop: "-2rem",
            marginBottom: "2rem",
            fontSize: "1.4rem",
        },
    },
})(TextField);

const MUITextArea = withStyles({
    root: {
        "& textarea": {
            background: "red",
        },
    },
})(TextareaAutosize);

function Profile() {
    const { pickModal } = useSelector((state) => state.modal);
    const {
        photo,
        _id,
        profileTitle: oldProfileTitle,
        bio: oldBio,
    } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log({ oldBio, oldProfileTitle });

    const [profileTitle, setProfileTitle] = useState(oldProfileTitle);
    const [bio, setBio] = useState(oldBio);

    const max = 80;

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
        await axios
            .delete(`/api/user/photo/${_id}`)
            .then((res) => {
                console.log("Photo successfully deleted");
                dispatch(removePhoto());
            })
            .catch((err) => console.log("Failed to remove photo"));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = { profileTitle, bio };

        await axios
            .put(`/api/user/${_id}`, data)
            .then((res) => {
                console.log("successfully updated profile title and bio");
            })
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
                        <img src={convertToBinary(photo)} alt="" />
                        <figcaption>
                            <button onClick={handleModal}>Pick an image</button>
                            <button onClick={handleRemove}>Remove</button>
                        </figcaption>
                    </figure>
                    <div className={styles.inputDiv}>
                        <MUITextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="name"
                            label="Profile Title"
                            value={profileTitle}
                            onChange={handleProfileTitle}
                            className={styles.input}
                            onBlur={handleSubmit}
                        />

                        <p>Bio</p>
                        <MUITextArea
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
                component={ImageModal}
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
