import React from "react";
import {ReactComponent as DogsIconFooter} from "../Assets/dogs-footer.svg";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <DogsIconFooter />
            <p>Dogs. Alguns direitos reservados.</p>
        </footer>
    )
}

export default Footer