import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Head from "../Helper/Head";
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

    React.useEffect(() => {
        /** Navigate to user personal page when a new post is created */
        if (data) navigate("/conta");
    }, [data, navigate]);

    /** When a image is added */
    function handleImgChange({target}) {
        if (target.files.length > 0) {
            setImg({
                preview: URL.createObjectURL(target.files[0]),
                raw: target.files[0],
            });
        }

        else setImg({});
    }

    /** Handle form submit */
    async function submitPhotoPostForm(event) {
        event.preventDefault();

        if (name.validate() && weight.validate() && age.validate() && Object.keys(img).length > 0) {
            const formData = new FormData();
            
            formData.append("img", img.raw);
            formData.append("nome", name.value);
            formData.append("peso", weight.value);
            formData.append("idade", age.value);

            const token = window.localStorage.getItem("token");

            if (token) {
                const {url, options} = PHOTO_POST(formData, token);

                await request(url, options);
            }
        }
    }

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <Head title="Adicionar Foto" description="Adicionar novas fotos ao site." />

            <form onSubmit={submitPhotoPostForm}>
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
                <div style={{marginBottom: "1.25rem"}}>
                    <input type="file" className={styles.img}
                        id="img"
                        name="img"
                        onChange={handleImgChange} />
                </div>

                {loading ?
                    (
                        <Button disabled>Enviando...</Button>
                    ) : (
                        <Button>Enviar</Button>
                    )
                }

                {error && <Error error={error} />}
            </form>
            
            {/* Image preview */}
            {img.preview &&
                <div>
                    <div className={styles.preview}
                        style={{backgroundImage: `url(${img.preview})`}}></div>
                </div>
            }
        </section>
    )
}

export default UserPhotoPost