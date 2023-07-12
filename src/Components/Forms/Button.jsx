import React from "react";
import styles from "./Button.module.css";

const Button = ({children, ...props}) => {
    return (
        <button className={`${styles.button} ${props.behavior === "btnCancel" ? styles.buttonCancel : ""}`}
            {...props}>
            {children}
        </button>
    )
}

export default Button