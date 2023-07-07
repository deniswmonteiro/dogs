import React from "react";

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    /** Fetch request */
    const request = React.useCallback(async (url, options) => {
        let response;
        let result;

        try {
            setError(null);
            setLoading(true);

            response = await fetch(url, options);
            result = await response.json();

            if (!response.ok) throw new Error(result.message);
        }

        catch (e) {
            setError(e.message);
            result = null;
        }

        finally {
            setLoading(false);
            setData(result);

            return {
                response,
                result
            };
        }
    }, []);

    return {
        data,
        loading,
        error,
        request
    }
}

export default useFetch