import React from "react";
import { useParams } from "react-router-dom";
import Head from "../Helper/Head";
import Feed from "../Feed/Feed";

const UserProfile = () => {
    const {id} = useParams();

    return (
        <section className="container mainContainer">
            <Head title={`@${id}`} description="Página de perfil do usuário." />

            <h1 className="title">{id}</h1>
            
            <Feed user={id} />
        </section>
    )
}

export default UserProfile