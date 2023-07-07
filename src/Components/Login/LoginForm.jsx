import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const LoginForm = () => {
    const username = useForm();
    const password = useForm();

    async function handleSubmit(event) {
        event.preventDefault();

        if (username.validate() && password.validate()) {
            const response = await fetch(`http://dogsapi.test/json/jwt-auth/v1/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            });

            const result = await response.json();
            console.log(result)
        }
    }

    return (
        <section>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text"
                    id="username"
                    {...username} />
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