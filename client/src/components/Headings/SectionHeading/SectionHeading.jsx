import React from 'react'
import Style from "./SectionHeading.module.css";
import PropTypes from 'prop-types'
import classNames from 'classnames';


const SectionHeading = ({ title, color = 'default', className, useH1 = false }) => {

    const headingClass = classNames(Style.heading, className, {
        [Style.primary]: color === 'primary'
    })

    return (
        <>
            {useH1
                ?
                <h1 className={headingClass}>{title}</h1>
                :
                <h3 className={headingClass}>{title}</h3>
            }
        </>
    )
}


SectionHeading.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['default', 'primary'])
}


export default SectionHeading