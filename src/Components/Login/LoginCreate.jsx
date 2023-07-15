import React from "react";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { USER_POST } from "../../api";
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

const LoginCreate = () => {
    const username = useForm();
    const email = useForm("email");
    const password = useForm();
    const {userLogin} = React.useContext(UserContext);
    const {loading, error, request} = useFetch();
    const navigate = useNavigate();

    /** Return to login page */
    function handleClickReturn(event) {
        event.preventDefault();

        navigate("/login");
    }

    /** Send new user data and create a user */
    async function submitRegisterForm(event) {
        event.preventDefault();

        if (username.validate() && email.validate() && password.validate()) {
            const {url, options} = USER_POST({
                username: username.value,
                email: email.value,
                password: password.value
            });

            const {response} = await request(url, options);

            if (response.ok) userLogin(username.value, password.value);
        }
    }

    return (
        <section className={`animeLeft`}>
            <Head title="Cadastrar-se" description="Fazer cadastro no site." />

            <h1 className="title">Cadastre-se</h1>

            <form onSubmit={submitRegisterForm}>
                {/* Username */}
                <Input label="Usuário" type="text"
                    id="username"
                    {...username} />

                {/* Email */}
                <Input label="Email" type="text"
                    id="email"
                    {...email} />

                {/* Password */}
                <Input label="Senha" type="password"
                    id="password"
                    {...password} />
                
                <div className="buttonGroup">
                    {loading ?
                        (
                            <Button disabled>Enviando...</Button>
                        ) : (
                            <Button behavior="btnConfirm">Enviar</Button>
                        )
                    }

                    <Button behavior="btnCancel" onClick={handleClickReturn}>
                        Voltar
                    </Button>
                </div>

                {error && <Error error={error} />}
            </form>
        </section>
    )
}

export default LoginCreate