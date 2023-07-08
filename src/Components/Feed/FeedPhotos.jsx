import React from "react";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error.jsx";
import Loading from "../Helper/Loading.jsx";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = () => {
    const {data, loading, error, request} = useFetch();

    /** Get all photos */
    React.useEffect(() => {
        async function fetchPhotos() {
            const {url, options} = PHOTOS_GET({
                page: 1,
                total: 6,
                user: 0
            });

            await request(url, options);
        }

        fetchPhotos();
    }, [request]);

    if (error) return <Error error={error} />

    if (loading) return <Loading />

    if (data) {
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => (
                    <FeedPhotosItem key={photo.id} photo={photo} />
                ))}
            </ul>
        )
    }

    else return null;
}

export default FeedPhotos