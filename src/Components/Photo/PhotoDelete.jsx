import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({id}) => {
    const {loading, request} = useFetch();
    const navigate = useNavigate()

    /** Handle photo delete */
    async function handleClick() {
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
                        onClick={handleClick}>
                        Deletar
                    </button>
                )
            }
        </>
    )
}

export default PhotoDelete