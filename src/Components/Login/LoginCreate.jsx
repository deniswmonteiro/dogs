import React from "react";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import { USER_POST } from "../../api";
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

const LoginCreate = () => {
    const username = useForm("username");
    const email = useForm("email");
    const password = useForm("password");
    const {userLogin} = React.useContext(UserContext);
    const {loading, error, request} = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();

        const {url, options} = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value
        });

        const {response} = await request(url, options);

        if (response.ok) userLogin(username.value, password.value);
    }

    return (
        <section className={`animeLeft`}>
            <Head title="Cadastrar-se" description="Fazer cadastro no site." />

            <h1 className="title">Cadastre-se</h1>

            <form onSubmit={handleSubmit}>
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
                
                {loading ? 
                    (
                        <Button disabled>Cadastrando...</Button>
                    ) : (
                        <Button>Cadastrar</Button>
                    )
                }

                <Error error={error} />
            </form>
        </section>
    )
}

export default LoginCreate