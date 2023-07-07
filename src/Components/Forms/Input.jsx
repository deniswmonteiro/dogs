import React from "react";
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

export default Input