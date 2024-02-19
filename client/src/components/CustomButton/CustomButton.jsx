import Style from "./CustomButton.module.css";
import classNames from "classnames";
import PropTypes from 'prop-types';

const CustomButton = ({
    variant = 'text',
    color = 'default',
    size,
    onClick,
    className,
    style,
    children,
    ...rest
}) => {

    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add(Style.ripple);

        const ripple = button.getElementsByClassName(Style.ripple)[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        if (onClick) onClick(event);
    }

    const buttonClass = classNames(Style.btn, className, {
        [Style.contained]: variant === 'contained',
        [Style.outlined]: variant === 'outlined',
        [Style.underline]: variant === 'underline',
        [Style.text]: variant === 'text',
        [Style.primary]: color === 'primary',
        [Style.danger]: color === 'danger',
        [Style.success]: color === 'success',
        [Style.default]: color === 'default',
        [Style.default_contained]: (color === 'default' && variant === 'contained'),
        [Style.primary_contained]: (color === 'primary' && variant === 'contained'),
        [Style.danger_contained]: (color === 'danger' && variant === 'contained'),
        [Style.success_contained]: (color === 'success' && variant === 'contained'),

    })

    return (
        <button
            onClick={createRipple}
            className={buttonClass}
            style={style}
        >
            {children}
        </button>
    )
};


CustomButton.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined', 'text', 'underline']),
    color: PropTypes.oneOf(['primary', 'danger', 'success', 'default'])
}


export default CustomButton;