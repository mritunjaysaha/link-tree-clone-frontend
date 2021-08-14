import styles from "./appearance.module.scss";
import { withStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const grey = "#263238";
const lightGrey = "#dce0e2";
const lightGrey1 = "#696e74";
const veryLightGrey = "#f5f6f8";
const error = "red";
const black = "#131415";
const green = "#39E09B";
const lightGreen = "#C3F6E1";

export const MUITextField = withStyles({
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
            "&:hover": {
                border: "none",
            },
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

function Profile() {
    return (
        <section className={styles.profileSection}>
            <p>profile</p>
            <div className={styles.profileInner}>
                <figure>
                    <img src="" alt="" />

                    <figcaption>
                        <button>Pick an image</button>
                        <button>Remove</button>
                    </figcaption>
                </figure>

                <div className={styles.inputDiv}>
                    <MUITextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="project-title"
                        label="Project Title"
                        // value={user.username}
                        // onChange={handleChange}

                        className={styles.input}
                    />
                </div>
            </div>
        </section>
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
