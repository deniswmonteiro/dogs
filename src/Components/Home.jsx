import React from "react";
import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
    return (
        <section className="container mainContainer">
            <Head title="Página Inicial" description="Dogs - Rede social para cachorros." />
            <Feed />
        </section>
    )
}

export default Home