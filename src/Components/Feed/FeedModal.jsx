import React from "react";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import PropTypes from "prop-types";
import styles from "./FeedModal.module.css";

const FeedModal = ({photo, setModalPhoto}) => {
    const {data, error, loading, request} = useFetch();

    React.useEffect(() => {
        /** Get photo and show in modal */
        async function getPhoto() {
            const {url, options} = PHOTO_GET(photo.id);

            await request(url, options);
        }

        getPhoto();
    }, [photo, request]);

    /** Close modal when click outside */
    function handleOutsideClick({target, currentTarget}) {
        if (target === currentTarget) setModalPhoto(null);
    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error error={error} />}
            
            {loading && <Loading />}

            {data && <PhotoContent data={data} setModalPhoto={setModalPhoto} single={false} />}
        </div>
    )
}

FeedModal.propTypes = {
    photo: PropTypes.object.isRequired,
    setModalPhoto: PropTypes.func.isRequired
}

export default FeedModal