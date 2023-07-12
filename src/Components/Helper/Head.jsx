import React from "react";
import PropTypes from "prop-types";

const Head = ({title, description}) => {
    React.useEffect(() => {
        document.title = `Dogs | ${title}`;
        document.querySelector("meta[name='description']").setAttribute("content", description || "");
    }, [title, description]);

    return <></>
}

Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default Head