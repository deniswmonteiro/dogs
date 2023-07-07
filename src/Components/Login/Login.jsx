import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";

const Login = () => {
    const {login} = useContext(UserContext);

    if (login === true) return <Navigate to="/" />

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="cadastrar" element={<LoginCreate />} />
                <Route path="perdeu" element={<LoginPasswordLost />} />
                <Route path="resetar" element={<LoginPasswordReset />} />
            </Routes>
        </div>
    )
}

export default Login