import React from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { ReactComponent as DogsLogo } from "../Assets/dogs.svg"
import styles from "./Header.module.css";

const Header = () => {
    const {data} = React.useContext(UserContext);

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link to="/"
                    className={styles.logo}
                    aria-label="Dogs - Página Inicial">
                    <DogsLogo />
                </Link>

                {data ?
                    (
                        <Link to="/conta"
                            className={styles.login}>
                            {data.nome}
                        </Link>
                    ) : (
                        <Link to="/login"
                            className={styles.login}>
                            Login/Cadastro
                        </Link>
                    )
                }
            </nav>
        </header>
    )
}

export default Header