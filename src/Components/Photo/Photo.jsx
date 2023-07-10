import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import {PHOTO_GET} from "../../api";
import Head from "../Helper/Head";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
    const {id} = useParams();
    const {data, error, loading, request} = useFetch();

    /** Show a single photo */
    React.useEffect(() => {
        async function getPhoto() {
            const {url, options} = PHOTO_GET(id);

            await request(url, options);
        }

        getPhoto()
    }, [id, request]);

    if (error) return <Error error={error} />

    if (loading) return <Loading />

    if (data) {
        return (
            <section className="container mainContainer">
                <Head title={`${data.photo.title}`} description="Página de estatísticas de acessos às fotos." />

                <PhotoContent data={data} single={true} />
            </section>
        )
    }

    else return null;
}

export default Photo