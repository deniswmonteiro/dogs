import React from "react";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
    const [title, setTitle] = React.useState("");
    const location = useLocation();

    /** Change page title according with URL */
    React.useEffect(() => {
        const {pathname} = location;

        switch (pathname) {
            case "/conta/estatisticas":
                setTitle("Estatísticas");
                break;

            case "/conta/postar":
                setTitle("Adicionar Foto");
                break;
            
            default:
                setTitle("Minhas Fotos");
        }
    }, [location]);

    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader