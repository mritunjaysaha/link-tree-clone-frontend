import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const lightGrey1 = "#696e74";
const veryLightGrey = "#f5f6f8";
const error = "red";
const black = "#131415";

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
            background: `${veryLightGrey}`,
            marginBottom: "2.4rem",
            borderRadius: "1.2rem",
            border: "2px solid transparent",
            color: `${black}`,
            "&:hover": {
                border: `0.2rem solid ${black}`,
            },
            "&:focus-within": {
                border: `0.2rem solid ${black}`,
            },
            "&:invalid": {
                border: `0.2rem solid ${error}`,
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
            color: `${lightGrey1}`,
        },
        // MuiFormHelperText-root MuiFormHelperText-contained Mui-error
        "& .MuiFormHelperText-root": {
            marginTop: "-2rem",
            marginBottom: "2rem",
            fontSize: "1.4rem",
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
