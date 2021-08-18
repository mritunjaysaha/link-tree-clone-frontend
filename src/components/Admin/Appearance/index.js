import styles from "./appearance.module.scss";
import { withStyles } from "@material-ui/core";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { ImageModal, MUIModal } from "./appearanceModals";
import { useSelector, useDispatch } from "react-redux";
import { pickModalReducer } from "./appearanceSlice";

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
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const max = 80;

    function handleName(e) {
        setName(e.target.value);
    }

    function handleBio(e) {
        if (bio.length <= 80) {
            setBio(e.target.value);
        }
    }

    function handleModal() {
        dispatch(pickModalReducer());
    }

    return (
        <>
            <section className={styles.profileSection}>
                <p>profile</p>
                <div className={styles.profileInner}>
                    <figure>
                        <img src="" alt="" />

                        <figcaption>
                            <button onClick={handleModal}>Pick an image</button>
                            <button>Remove</button>
                        </figcaption>
                    </figure>

                    <div className={styles.inputDiv}>
                        <MUITextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="name"
                            label="Profile Title"
                            value={name}
                            onChange={handleName}
                            className={styles.input}
                        />

                        <p>Bio</p>
                        <MUITextArea
                            name="bio"
                            placeholder="Empty"
                            minRows="5"
                            value={bio}
                            onChange={handleBio}
                            className={styles.textarea}
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

function Theme() {}

export function Appearance() {
    return (
        <section className={styles.appearanceSection}>
            <Profile />
        </section>
    );
}
