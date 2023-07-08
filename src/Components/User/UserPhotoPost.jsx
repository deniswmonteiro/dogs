import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import styles from "./UserPhotoPost.module.css";

const UserPhotoPost = () => {
    const name = useForm();
    const weight = useForm("number");
    const age = useForm("number");
    const [img, setImg] = React.useState({});
    const {data, error, loading, request} = useFetch();
    const navigate = useNavigate();

    /** Navigate to user personal page when a new post is created */
    React.useEffect(() => {
        if (data) navigate("/conta");
    }, [data, navigate]);

    /** When a image is added */
    function handleImgChange({target}) {
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        });
    }

    /** Handle form submit */
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        
        formData.append("img", img.raw);
        formData.append("name", name.value);
        formData.append("weight", weight.value);
        formData.append("age", age.value);

        const token = window.localStorage.getItem("token");

        if (token) {
            const {url, options} = PHOTO_POST(formData, token);

            request(url, options);
        }
    }

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <Input label="Nome" type="text"
                    id="name"
                    {...name} />

                {/* Weight */}
                <Input label="Peso" type="text"
                    id="weight"
                    {...weight} />

                {/* Age */}
                <Input label="Idade" type="text"
                    id="age"
                    {...age} />

                {/* Image */}
                <input type="file" className={styles.img}
                    id="img"
                    name="img"
                    onChange={handleImgChange} />

                {loading ?
                    (
                        <Button disabled>Enviando...</Button>
                    ) : (
                        <Button>Enviar</Button>
                    )
                }

                <Error error={error} />
            </form>
            
            {/* Image preview */}
            <div>
                {img.preview &&
                    <div className={styles.preview}
                        style={{backgroundImage: `url(${img.preview})`}}></div>}
            </div>
        </section>
    )
}

export default UserPhotoPost