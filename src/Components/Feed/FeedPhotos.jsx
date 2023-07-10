import React from "react";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error.jsx";
import Loading from "../Helper/Loading.jsx";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({page, user, setInfinite, setModalPhoto}) => {
    const {data, loading, error, request} = useFetch();

    /** Get all photos */
    React.useEffect(() => {
        async function fetchPhotos() {
            const total = 3;
            const {url, options} = PHOTOS_GET({
                page,
                total,
                user
            });

            const {response, result} = await request(url, options);

            console.log(result.length)

            if (response && response.ok && result.length < total) {
                setInfinite(false);
            }
        }

        fetchPhotos();
    }, [request, page, user, setInfinite]);

    if (error) return <Error error={error} />

    if (loading) return <Loading />

    if (data) {
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => (
                    <FeedPhotosItem key={photo.id}
                        photo={photo}
                        setModalPhoto={setModalPhoto} />
                ))}
            </ul>
        )
    }

    else return null;
}

export default FeedPhotos