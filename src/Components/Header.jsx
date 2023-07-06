import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as DogsLogo } from "../Assets/dogs.svg"

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link to="/"
                    className={styles.logo}
                    aria-label="Dogs - Página Inicial">
                    <DogsLogo />
                </Link>
                <Link to="/login"
                    className={styles.login}>
                    Login/Cadastro
                </Link>
            </nav>
        </header>
    )
}

export default Header