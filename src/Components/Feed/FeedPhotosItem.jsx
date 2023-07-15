import React from "react";
import Image from "../Helper/Image";
import PropTypes from "prop-types";
import styles from "./FeedPhotosItem.module.css";

const FeedPhotosItem = ({photo, setModalPhoto}) => {
    const [photoViews, setPhotoViews] = React.useState(() => photo.acessos);

    function showModalPhoto() {
        setModalPhoto(photo);
        setPhotoViews(Number(photoViews) + 1);
    }
    
    return (
        <li className={styles.photo} onClick={showModalPhoto}>
            <Image src={photo.src} alt={photo.title} />
            
            <span className={styles.views}>
                {photoViews}
            </span>
        </li>
    )
}

FeedPhotosItem.propTypes = {
    photo: PropTypes.object.isRequired,
    setModalPhoto: PropTypes.func.isRequired,
}

export default FeedPhotosItem