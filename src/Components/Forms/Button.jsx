import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({children, ...props}) => {
    return (
        <button className={`${styles.button} ${props.behavior === "btnCancel" ? styles.buttonCancel : ""}`}
            {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
}

export default Button