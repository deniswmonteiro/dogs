import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({id}) => {
    const {loading, request} = useFetch();
    const navigate = useNavigate()

    /** Handle photo delete */
    async function handlePhotoDelete() {
        const confirm = window.confirm("Tem certeza que deseja deletar?");

        if (confirm) {
            const token = window.localStorage.getItem("token");

            if (token) {
                const {url, options} = PHOTO_DELETE(id, token);
                const {response} = await request(url, options);

                if (response.ok) navigate("/conta");
            }
        }
    }

    return (
        <>
            {loading ?
                (
                    <button className={styles.btnDelete}
                        disabled>
                        Deletar
                    </button>
                ) : (
                    <button className={styles.btnDelete}
                        onClick={handlePhotoDelete}>
                        Deletar
                    </button>
                )
            }
        </>
    )
}

PhotoDelete.propTypes = {
    id: PropTypes.number.isRequired,
}

export default PhotoDelete