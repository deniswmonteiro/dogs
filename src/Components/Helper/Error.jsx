import React from "react";
import PropTypes from "prop-types";

const Error = ({error}) => {
    if (!error) return null

    return (
        <p style={{color: "#F31", margin: "1rem 0"}}>
            {error}
        </p>
    )
}

Error.propTypes = {
    error: PropTypes.string.isRequired,
}

export default Error