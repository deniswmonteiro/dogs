import React from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";

const Image = ({src, alt}) => {
    const [skeleton, setSkeleton] = React.useState(true);

    function handleLoad({target}) {
        setSkeleton(false);
        target.style.opacity = 1;
    }

    return (
        <div className={styles.wrapper}>
            {skeleton && <div className={styles.skeleton}></div>}
            
            <img src={src} alt={alt}
                className={styles.img}
                onLoad={handleLoad} />
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default Image