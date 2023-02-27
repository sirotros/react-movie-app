import PropTypes from "prop-types";
import "./Button.scss"
function Button({ variant, size, type, disabled, outline, className, children, onClick }) {

    const renderClasses = () => {
        let classes = "btn btn-";
        classes += outline ? "outline-" + variant : variant;
        classes += size ? " btn-" + size : "";
        classes += disabled ? " disabled" : "";
        classes += className ? " " + className : "";

        return classes;
    }
    
    return (
        <button className={renderClasses()} disabled={disabled} type={type} onClick={onClick}> {children} </button>
    );
};

Button.defaultProps = {
    variant: "primary",
    type: "button",
    disabled: false,
    outline: false,
}

Button.propTypes = {
    variant: PropTypes.oneOf(["light", "dark", "primary", "danger", "warning", "success", "secondary", "info", "link"]), //bunlardan bir tanesi gelebilir(oneOf)
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}

export default Button;
