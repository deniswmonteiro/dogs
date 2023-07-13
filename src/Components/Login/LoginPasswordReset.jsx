import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { PASSWORD_RESET } from "../../api";
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState("");
    const [key, setKey] = React.useState("");
    const password = useForm("password");
    const {loading, error, request} = useFetch();
    const navigate = useNavigate();

    /** Get key and username from URL */
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get("key");
        const login = params.get("login");

        if (key) setKey(key);
        if (login) setLogin(login);
    }, []);

    /** Return to login page */
    function handleClickReturn(event) {
        event.preventDefault();

        navigate("/login");
    }

    /** Send new password */
    async function submitPasswordResetForm(event) {
        event.preventDefault();

        if (password.validate()) {
            const {url, options} = PASSWORD_RESET({
                login,
                key,
                password: password.value
            });

            const {response} = await request(url, options);

            if (response.ok) navigate("/login");
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Criar nova senha" description="Criar nova senha de usuário." />

            <h1 className="title">Criar nova senha</h1>
            
            <form onSubmit={submitPasswordResetForm}>
                {/* Password */}
                <Input label="Nova Senha" type="password"
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
            </form>

            {error && <Error error={error} />}
        </section>
    )
}

export default LoginPasswordReset