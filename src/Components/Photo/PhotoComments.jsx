import React from "react";
import {UserContext} from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({id, comments}) => {
    const [photoComments, setPhotoComments] = React.useState(() => comments);
    const {login} = React.useContext(UserContext);
    const commentsSection = React.useRef(null);

    /** Go to the last comment */
    React.useEffect(() => {
        commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }, [photoComments])

    return (
        <>
            <ul className={styles.comments} ref={commentsSection}>
                {photoComments && photoComments.map((photoComment) => (
                    <li key={photoComment.comment_ID}>
                        <b>{photoComment.comment_author}: </b>
                        <span>{photoComment.comment_content}</span>
                    </li>
                ))}
            </ul>

            {login && <PhotoCommentsForm id={id} setPhotoComments={setPhotoComments} />}
        </>
    )
}

export default PhotoComments