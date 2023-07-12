import React from "react";
import Image from "../Helper/Image";
import PropTypes from "prop-types";
import styles from "./FeedPhotosItem.module.css";

const FeedPhotosItem = ({photo, setModalPhoto}) => {
    const [photoViews, setPhotoViews] = React.useState(() => photo.views);

    function handleClick() {
        setModalPhoto(photo);
        setPhotoViews(Number(photoViews) + 1);
    }
    
    return (
        <li className={styles.photo} onClick={handleClick}>
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