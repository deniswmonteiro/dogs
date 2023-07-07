import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const LoginForm = () => {
    const username = useForm();
    const password = useForm();

    /** Get user data if token exists on local storage */
    React.useEffect(() => {
        const token = window.localStorage.getItem("token");

        if (token) getUser(token);
    }, []);

    /** When form is submited */
    async function handleSubmit(event) {
        event.preventDefault();

        // Validate username and password before send form data
        if (username.validate() && password.validate()) {
            const {url, options} = TOKEN_POST({
                username: username.value, 
                password: password.value
            });

            const response = await fetch(url, options);
            const result = await response.json();

            // Save token in local storage and receive user data
            window.localStorage.setItem("token", result.token);
            getUser(result.token);
        }
    }

    /** Get user data */
    async function getUser(token) {
        const {url, options} = USER_GET(token);
        const response = await fetch(url, options);

        await response.json();
    }

    return (
        <section>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                {/* Username */}
                <Input label="Usuário" type="text"
                    id="username"
                    {...username} />

                {/* Password */}
                <Input label="Senha" type="password"
                    id="password"
                    {...password} />
                <Button>Entrar</Button>
            </form>

            <Link to="/login/cadastrar">
                Cadastro
            </Link>
        </section>
    )
}

export default LoginForm