import React from 'react'
import Style from "./SectionSubHeading.module.css";
import PropTypes from 'prop-types'


const SectionSubHeading = ({ title, icon }) => {
    return (
        <h3 className={Style.heading}>
            {icon} {title}
        </h3>
    )
}

SectionSubHeading.propTypes = {
    title: PropTypes.string.isRequired,
}

export default SectionSubHeading