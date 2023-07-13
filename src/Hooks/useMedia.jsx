import React from "react";

const useMedia = (media) => {
    const [match, setMatch] = React.useState(null);

    React.useEffect(() => {
        /** Get window size on resize */
        function changeMatch() {
            const {matches} = window.matchMedia(media);

            setMatch(matches);
        }

        changeMatch();

        window.addEventListener("resize", changeMatch);

        return () => {
            window.removeEventListener("resize", changeMatch);
        }
    }, [media]);

    return match;
}

export default useMedia