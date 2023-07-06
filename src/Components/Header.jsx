import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <Link to="/">Página Inicial</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    )
}

export default Header