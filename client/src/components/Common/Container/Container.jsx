import classNames from 'classnames'
import React from 'react'
import Style from "./Container.module.css"

const Container = ({
    children,
    className,
    padding = "normal"
}) => {

    const containerClass = classNames(Style.container, className, {
        [Style.normal_padding]: padding == "normal",
    })

    return (
        <div className={`${containerClass}`}>
            {children}
        </div>
    )
}

export default Container