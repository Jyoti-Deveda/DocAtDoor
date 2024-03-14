import Style from "./CustomButton.module.css";
import classNames from "classnames";
import PropTypes from 'prop-types';

const CustomButton = ({
    variant = 'text',
    color = 'default',
    onClick,
    className,
    style,
    children,
    startIcon,
    endIcon,
    size = 'default',
    responsive = false,
    params = [],
    rounded = false,
    roundedFull = false,
    circle = false,
    boxShadow = true,
    iconButton = false,
    disabled = false,
    hidden = false,
    ...rest
}) => {

    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${offsetX - radius}px`;
        circle.style.top = `${offsetY - radius}px`;
        circle.classList.add(Style.ripple);

        const ripple = button.getElementsByClassName(Style.ripple)[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        if (onClick) onClick(event, ...params);
    }

    const buttonClass = classNames(Style.btn, className, {
        [Style.contained]: variant === 'contained',
        [Style.outlined]: variant === 'outlined',
        [Style.underline]: variant === 'underline',
        [Style.text]: variant === 'text',
        [Style.group_btn]: variant === 'group' || variant === 'group-active',
        [Style.group_btn_active]: variant === 'group-active',
        [Style.text_to_primary]: variant === 'text-primary',

        [Style.primary]: color === 'primary',
        [Style.danger]: color === 'danger',
        [Style.warning]: color === 'warning',
        [Style.success]: color === 'success',
        [Style.default]: color === 'default',
        [Style.neutral_primary]: color === 'neutral-primary',

        [Style.default_contained]: (color === 'default' && variant === 'contained'),
        [Style.primary_contained]: (color === 'primary' && variant === 'contained'),
        [Style.danger_contained]: (color === 'danger' && variant === 'contained'),
        [Style.warning_contained]: (color === 'warning' && variant === 'contained'),
        [Style.success_contained]: (color === 'success' && variant === 'contained'),
        [Style.primary_grad_contained]: (color === 'primary-gradient' && variant === 'contained'),

        [Style.default_size]: size === 'default',
        [Style.small_size]: size === 'small',
        [Style.extra_small_size]: size === 'xsmall',
        [Style.large_size]: size === 'large',

        [Style.rounded]: rounded,
        [Style.roundedFull]: roundedFull,
        [Style.circle]: circle,
        [Style.boxShadow]: boxShadow,
        [Style.iconButton]: iconButton,


    })

    return (
        <>
            {!hidden &&
                <button
                    onClick={createRipple}
                    className={buttonClass}
                    style={style}
                    disabled={disabled}
                    hidden={hidden}
                >
                    {startIcon}
                    {children}
                    {endIcon}
                </button>
            }
        </>
    )
};

CustomButton.propTypes = {
    variant: PropTypes.oneOf(['contained', 'outlined', 'text', 'underline', 'group', 'group-active', 'text-primary']),
    color: PropTypes.oneOf(['primary', 'danger', 'success', 'warning', 'default', 'primary-gradient', 'neutral-primary']),
    size: PropTypes.oneOf(['small', 'default', 'large', 'xsmall']),
    responsive: PropTypes.bool,
    rounded: PropTypes.bool,
    roundedFull: PropTypes.bool,
}

export default CustomButton;