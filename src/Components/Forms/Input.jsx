import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({label, type, id, value, onChange, onBlur, error}) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input type={type} className={styles.input}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string,
}

export default Input