import "./Button.css";

function Button({
                    children,
                    variant = "primary",
                    size = "medium",
                    type = "button",
                    onClick,
                    disabled = false,
                }) {
    const className = `button button--${variant} button--${size}`;

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;