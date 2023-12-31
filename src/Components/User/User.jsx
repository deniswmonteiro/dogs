import React from "react";
import { UserContext } from "../../UserContext";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Head from "../Helper/Head";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import NotFound from "../NotFound";

const User = () => {
    const {data} = React.useContext(UserContext);

    return (
        <section className="container">
            <Head title="Minhas Fotos" description="Página com as fotos postadas pelo usuário." />

            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data.id} />} />
                <Route path="postar" element={<UserPhotoPost />} />
                <Route path="estatisticas" element={<UserStats />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    )
}

export default User