import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadStatus());
    function getProfession(id) {
        return profession.find((p) => p._id === id);
    }
    const prof = getProfession(id);
    if (!professionLoading) {
        return <p>{prof.name}</p>;
    } else return "loading ...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
