import { useState } from "react";

export function useLoader() {
    const [isLoading, setIsLoading] = useState(false);

    function startLoader() {
        setIsLoading(true);
    }

    function stopLoader() {
        setIsLoading(false);
    }

    return [isLoading, startLoader, stopLoader];
}
