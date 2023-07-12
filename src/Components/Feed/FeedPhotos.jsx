import React from "react";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import FeedPhotosItem from "./FeedPhotosItem";
import Error from "../Helper/Error.jsx";
import Loading from "../Helper/Loading.jsx";
import PropTypes from "prop-types";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({page, user, setInfinite, setModalPhoto}) => {
    const {data, loading, error, request} = useFetch();
    const [hasPages, setHasPages] = React.useState(true);

    /** Get all photos */
    React.useEffect(() => {
        async function fetchPhotos() {
            const total = 6;
            const {url, options} = PHOTOS_GET({
                page,
                total,
                user
            });

            const {response, result} = await request(url, options);

            /** Infinite scroll until result is minor than total */
            if (response && response.ok && result.length < total) {
                setInfinite(false);
                setHasPages(false);
            }
        }

        fetchPhotos();
    }, [request, page, user, setInfinite]);

    if (error) return <Error error={error} />

    if (loading) return <Loading />

    if (data) {
        return (
            <>
                <ul className={`${styles.feed} animeLeft`}>
                    {data.map((photo) => (
                        <FeedPhotosItem key={photo.id}
                            photo={photo}
                            setModalPhoto={setModalPhoto} />
                    ))}
                </ul>

                {!hasPages &&
                    <p style={{textAlign: "center", padding: "3rem 0px", color: "rgb(136, 136, 136)"}}>
                        Não existem mais postagens.
                    </p>
                }
            </>
        )
    }

    else return null;
}

FeedPhotos.defaultProps = {
    page: 1,
    user: 0,
}

FeedPhotos.propTypes = {
    page: PropTypes.number.isRequired,
    user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    setInfinite: PropTypes.func.isRequired,
    setModalPhoto: PropTypes.func.isRequired,
}

export default FeedPhotos