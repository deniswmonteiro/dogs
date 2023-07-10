import React from "react";
import Feed from "./Feed/Feed";
import Loading from "./Helper/Loading";

const Home = () => {
    return (
        <section className="container mainContainer">
            <Feed user={0} />
        </section>
    )
}

export default Home