import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styles from "./input.module.scss";

const MUITextField = withStyles({
    root: {
        "& .MuiInputLabel-shrink": {
            "font-size": "1.6rem",
        },
        "& .MuiInputBase-input": {
            color: "#16161d",
        },
        "& label": {
            // color: "#16161d",
            // "font-size": "2rem",
        },
        "& label.Mui-focused": {
            color: "#16161d",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green",
        },

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "transparent",
            },
            "&:hover fieldset": {
                border: "none",
                borderColor: "none",
            },
            "&.Mui-focused fieldset": {
                borderColor: "transparent",
                // borderColor: "#16161d",
            },
        },
    },
})(TextField);

export function InputField(props) {
    return (
        <div className={styles.input}>
            <MUITextField
                id="outlined-password-input"
                variant="outlined"
                fullWidth
                {...props}
            />
        </div>
    );
}
