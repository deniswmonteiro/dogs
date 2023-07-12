import React from "react";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../UserContext";
import { TOKEN_VALIDATE_POST } from "../../api";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({id, comments, single}) => {
    const [photoComments, setPhotoComments] = React.useState(() => comments);
    const {request} = useFetch();
    const commentsSection = React.useRef(null);
    const {login, userLogout} = React.useContext(UserContext);

    React.useEffect(() => {
        // Log out user if token is invalid
        async function validateToken(token) {
            const {url, options} = TOKEN_VALIDATE_POST(token);
            const {response} = await request(url, options);

            if (!response.ok) userLogout();
        }

        const token = window.localStorage.getItem("token");

        if (token) validateToken(token);

        // Go to the last comment
        commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }, [photoComments]);

    return (
        <>
            <ul className={`${styles.comments} ${single ? styles.photoSingle : ""}`}
                ref={commentsSection}>
                {photoComments && photoComments.map((photoComment) => (
                    <li key={photoComment.comment_ID}>
                        <b>{photoComment.comment_author}: </b>
                        <span>{photoComment.comment_content}</span>
                    </li>
                ))}
            </ul>

            {login && <PhotoCommentsForm id={id} setPhotoComments={setPhotoComments} single={single} />}
        </>
    )
}

export default PhotoComments