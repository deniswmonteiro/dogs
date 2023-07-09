import React from "react";
import styles from "./PhotoCommentsForm.module.css";
import {ReactComponent as SendComment} from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";

const PhotoCommentsForm = ({id, setPhotoComments}) => {
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
        <form className={styles.form} onSubmit={handleSubmit}>
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

            {error && <Error error={error} />}
        </form>
    )
}

export default PhotoCommentsForm