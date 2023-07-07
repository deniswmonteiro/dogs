import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const LoginForm = () => {
    const username = useForm();
    const password = useForm();
    const {userLogin, loading, error} = React.useContext(UserContext);

    /** When form is submited */
    async function handleSubmit(event) {
        event.preventDefault();

        // Validate username and password before send form data
        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value);
        }
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

                {loading ? 
                    (
                        <Button disabled>Carregando...</Button>
                    ) : (
                        <Button>Entrar</Button>
                    )
                }

                {error && <p>{error}</p>}
            </form>

            <Link to="/login/cadastrar">
                Cadastro
            </Link>
        </section>
    )
}

export default LoginForm