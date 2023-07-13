import React from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    // /** Remove user data and log out */
    const userLogout = React.useCallback(async function () {
        setData(null);
        setError(null),
        setLoading(false);
        setLogin(false);

        window.localStorage.removeItem("token");
    }, []);

    /** Log in user */
    async function userLogin(username, password) {
        try {
            setError(null);
            setLoading(true);

            // Get a JWT
            const {url, options} = TOKEN_POST({
                username: username,
                password: password
            });
            
            const response = await fetch(url, options);

            if (!response.ok) throw new Error("Credenciais inválidas.");

            const {token} = await response.json();

            window.localStorage.setItem("token", token);
            await getUser(token);

            navigate("/");
        }

        catch (e) {
            setError(e.message);
            setTimeout(() => setError(null), 5000);
            setLogin(false);
        }

        finally {
            setLoading(false);
        }
    }

    /** Get user data */
    async function getUser(token) {
        const {url, options} = USER_GET(token);
        const response = await fetch(url, options);
        const result = await response.json();

        setData(result);
        setLogin(true);
    }

    React.useEffect(() => {
        /** Auto login user if a valid token is saved in local storage */
        async function autoLogin() {
            const token = window.localStorage.getItem("token");

            if (token) {
                try {
                    setError(null);
                    setLoading(true);

                    // Validate JWT
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url, options);

                    if (!response.ok) throw new Error("Token inválido.");

                    await getUser(token);
                }

                catch (e) {
                    userLogout();
                }

                finally {
                    setLoading(false);
                }
            }

            else setLogin(false);
        }

        autoLogin();
    }, [userLogout]);

    return (
        <UserContext.Provider value={{userLogin, data, login, userLogout, loading, error}}>
            {children}
        </UserContext.Provider>
    )
}