import React from "react";
import {ReactComponent as SendComment} from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import PropTypes from "prop-types";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({id, setPhotoComments, single}) => {
    const [comment, setComment] = React.useState("");
    const {error, request} = useFetch();

    /** Add comments to a post */
    async function handleSubmit(event) {
        event.preventDefault();

        const token = window.localStorage.getItem("token");

        if (token) {
            const {url, options} = COMMENT_POST(id, {comment}, token);
            const {response, result} = await request(url, options);

            /** Add old comments and the new comment */
            if (response.ok) {
                setComment("");
                setPhotoComments((comments) => [...comments, result]);
            }
        }
    }

    return (
        <form className={`${styles.form} ${single ? styles.photoSingle : ""}`}
            onSubmit={handleSubmit}>
            <div>
                <label htmlFor="comment" className={styles.label}>
                    Adicione um comentário...
                </label>
                <div className={styles.inputGroup}>
                    <textarea className={styles.textarea} id="comment"
                        name="comment"
                        value={comment}
                        onChange={({target}) => setComment(target.value)}>
                    </textarea>
                    <button className={styles.button}>
                        <SendComment />
                    </button>
                </div>
            </div>

            {error && <Error error={error && "Preencha o campo."} />}
        </form>
    )
}

PhotoCommentsForm.propTypes = {
    id: PropTypes.number.isRequired,
    setPhotoComments: PropTypes.func.isRequired,
    single: PropTypes.bool.isRequired,
}

export default PhotoCommentsForm