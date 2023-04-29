import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const [quals, setQuals] = useState([]);

    useEffect(() => {
        const qualities = [];
        for (let i = 0; i < id.length; i++) {
            const quality = getQuality(id[i]);
            qualities.push(quality);
        }
        setQuals(qualities);
    }, [id, getQuality]);

    if (!isLoading) {
        return (
            <>
                {quals.map((quality) => (
                    <p
                        className={"badge m-1 bg-" + quality.color}
                        key={quality.id}
                    >
                        {quality.name}
                    </p>
                ))}
            </>
        );
    } else {
        return "loading ...";
    }
};

Quality.propTypes = {
    id: PropTypes.arrayOf(PropTypes.string)
};

export default Quality;
