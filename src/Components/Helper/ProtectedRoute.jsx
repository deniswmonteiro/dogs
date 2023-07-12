import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_VALIDATE_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";

const ProtectedRoute = ({children}) => {
    const {login, userLogout} = React.useContext(UserContext);
    const {request} = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        // Log out user if token is invalid
        async function validateToken() {
            const token = window.localStorage.getItem("token");
            const {url, options} = TOKEN_VALIDATE_POST(token);
            const {response} = await request(url, options);

            if (!response.ok) {
                userLogout();
                navigate("/login");
            }
        }

        validateToken();
    }, []);

    if (login === true) return children;
    else if (login === false) return <Navigate to="/login" />;
    else return <></>;
}

export default ProtectedRoute