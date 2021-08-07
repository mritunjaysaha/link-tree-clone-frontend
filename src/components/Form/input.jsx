import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styles from "./input.module.scss";

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
            borderRadius: "1.2rem",
            background: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: "1.6rem",
        },
        "& .MuiFilledInput-input": {
            background: "#f5f6f8",
            marginBottom: "2rem",
            borderRadius: "1.2rem",
            color: "#131415",
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
            color: "#696e74",
        },
    },
})(TextField);

export function InputField(props) {
    return (
        <>
            <MUITextField variant="filled" fullWidth {...props} />
        </>
    );
}
