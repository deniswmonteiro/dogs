import React from "react";

/** Form types */
const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Preencha um email válido.",
        min: 1
    },
    username: {
        regex: /^[a-zA-Z0-9@#$%!^&*_.-]{6,}$/,
        message: "Preencha um nome de usuário válido.",
        min: 6
    },
    password: {
        regex: /^[a-zA-Z0-9@#$%!^&*-.]{6,}$/,
        message: "Preencha uma senha válida.",
        min: 6
    }
}

const useForm = (type) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(null);

    /** Validate fields */
    function validate(value) {
        if (type === false) return true;
        
        if (value.length === 0) {
            setError("Preecha o campo.");
            return false;
        }

        else if (type && value.length < types[type].min) {
            setError(`Mínimo de ${types[type].min} caracteres.`);
            return false;
        }

        else if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        }

        else {
            setError(null);
            return true;
        }
    }

    /** When field value changed */
    function onChange({target}) {
        if (error) validate(target.value);

        setValue(target.value);
    }

    return {
        value,
        setValue,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
        onChange,
    }
}

export default useForm