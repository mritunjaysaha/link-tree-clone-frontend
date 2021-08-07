import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styles from "./input.module.scss";

const MUITextField = withStyles({
    root: {
        "& .MuiInputBase-input": {
            fontSize: "1.4rem",
            lineHeight: "2.1rem",
        },
        "& .MuiFilledInput-root": {
            borderRadius: "1.2rem",
            background: "none",
            fontFamily: "Inter, sans-serif",
        },
        "& .MuiFilledInput-underline": {
            "&::before": {
                border: "none",
            },
            "&::after": {
                border: "none",
            },
        },
        "& .MuiFormLabel-root": {},
        "& .MuiInputLabel-shrink": {
            color: "#696e74",
        },
    },
})(TextField);

export function InputField(props) {
    return (
        <>
            <div className={`${styles.muiInput}`}>
                <MUITextField variant="filled" fullWidth {...props} />
            </div>
        </>
    );
}
