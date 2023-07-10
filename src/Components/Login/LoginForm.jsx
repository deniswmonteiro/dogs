import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";

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
        <section className="animeLeft">
            <Head title="Login" description="Fazer login no site." />

            {/* Login */}
            <h1 className="title">Login</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
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

                <Error error={error} />
            </form>

            <Link to="/login/perdeu" className={styles.lost}>
                Perdeu a senha?
            </Link>

            {/* Register */}
            <div className={styles.register}>
                <h2 className={styles.subtitle}>
                    Cadastre-se
                </h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                
                <Link to="/login/cadastrar" className={stylesBtn.button}>
                    Cadastro
                </Link>
            </div>
        </section>
    )
}

export default LoginForm