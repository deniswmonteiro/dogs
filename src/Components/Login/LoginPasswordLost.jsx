import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../api";
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

const LoginPasswordLost = () => {
    const login = useForm();
    const {data, loading, error, request} = useFetch();

    /** Send URL with key to reset the password */
    async function handleSubmit(event) {
        event.preventDefault();

        if (login.validate()) {
            const {url, options} = PASSWORD_LOST({
                login: login.value,
                url: window.location.href.replace("perdeu", "resetar")
            });

            await request(url, options);
        }
    }

    return (
        <section>
            <Head title="Perdeu a Senha?" description="Enviar link para criação de nova senha por email." />

            <h1 className="title">Perdeu a senha?</h1>
            
            {data ?
                (
                    <p style={{color: "#4C1"}}>{data}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Email/Username */}
                        <Input label="Email/Usuário" type="text"
                            id="login"
                            {...login} />

                        {loading ?
                            (
                                <Button disabled>Enviando...</Button>
                            ) : (
                                <Button>Enviar</Button>
                            )
                        }
                    </form>

                )
            }
                
                {error && <Error error={error} />}
        </section>
    )
}

export default LoginPasswordLost