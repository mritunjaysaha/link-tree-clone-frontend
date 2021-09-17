import Loader from "react-loader-spinner";

export function LoadingSpinner({ color = "#fafafa" }) {
    return <Loader type="TailSpin" color={color} />;
}
