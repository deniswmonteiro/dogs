import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import Image from "../Helper/Image";
import PhotoDelete from "./PhotoDelete";
import PhotoComments from "./PhotoComments";
import PropTypes from "prop-types";
import styles from "./PhotoContent.module.css";

const PhotoContent = ({data, single, setModalPhoto}) => {
    const {photo, comments} = data;
    const user = React.useContext(UserContext);

    /** Close modal when the button is clicked */
    function closeModal() {
        setModalPhoto(null);
    }

    return (
        <div className={`${styles.photo} ${single ? styles.photoSingle : ""}`}>
            <div className={styles.photoHeader}>
                <button onClick={closeModal}></button>
            </div>
            <div className={styles.photoBody}>
                <div className={styles.img}>
                    <Image src={photo.src} alt={photo.title} />
                </div>
                <div className={styles.details}>
                    <div>
                        <p className={styles.author}>
                            {/* Show button to delete photo only if logged user is equal to photo author */}
                            {user.data && user.data.username === photo.author ?
                                (
                                    <PhotoDelete id={photo.id} />
                                ) : (
                                    <Link to={`/perfil/${photo.author}`}>
                                        @{photo.author}
                                    </Link>
                                )
                            }
                            
                            <span className={styles.views}>
                                {photo.views}
                            </span>
                        </p>

                        <h1 className="title">
                            <Link to={`/foto/${photo.id}`}>
                                {photo.title}
                            </Link>
                        </h1>

                        <ul className={styles.attributes}>
                            <li>
                                {photo.weight} kg
                            </li>
                            <li>
                                {photo.age === 1 ? `${photo.age} ano` : `${photo.age} anos`}
                            </li>
                        </ul>
                    </div>
                </div>
                
                <PhotoComments id={photo.id} comments={comments} single={single} />
            </div>
        </div>
    )
}

PhotoContent.propTypes = {
    data: PropTypes.object.isRequired,
    single: PropTypes.bool.isRequired,
    setModalPhoto: PropTypes.func.isRequired,
}

export default PhotoContent