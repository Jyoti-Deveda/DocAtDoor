import classNames from 'classnames'
import React from 'react'
import Style from "./StatusChips.module.css";
import PropTypes from "prop-types";


const StatusChips = ({
    status = '',
    variant = 'default',
    rounded = false,
    color = 'priamry',
    style,
    noMargin = false,
    fontSize = 'default',
    startIcon,
    endIcon,
    onClick
}) => {

    const statusClass = classNames(Style.status, {
        [Style.danger]: status === 'Expired' || status === 'Rejected' || status === 'Inactive' || color === 'danger',
        [Style.success]: status === 'Active' || status === 'Verified' || status === 'Shortlisted' || color === 'success',
        [Style.warning]: status === 'Upcoming' || status === 'Scheduled' || status === 'Pending' || color === 'warning',

        [Style.outlined]: variant === 'outlined',
        [Style.contained]: variant === 'contained',
        [Style.disable]: variant === 'disable',

        [Style.rounded]: rounded,
        [Style.noMargin]: noMargin,

        [Style.font_small]: fontSize === 'small',
        [Style.hover_effect]: onClick && variant != "disable",

    })

    return (
        <div
            className={statusClass}
            style={{ ...style }}
            onClick={onClick}
        >
            {startIcon}
            {status}
            {endIcon}
        </div>
    )
}

StatusChips.propTypes = {
    status: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['default', 'outlined', 'contained', 'disable']),
    color: PropTypes.oneOf(['danger', 'success', 'warning', 'primary']),
    fontSize: PropTypes.oneOf(['default', 'small'])
}

export default StatusChips