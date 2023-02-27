import PropTypes from "prop-types";

function Input({ type, disabled, label, className, placeholder, onChange }) {

    return (
        <>
            {
                label ?
                    <div className={`input-group mb-3 ${className}`}>
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" className="form-control" placeholder={placeholder} disabled={disabled} />
                    </div>
                    :
                    < input className={`form-control ${className}`} disabled={disabled} type={type} placeholder={placeholder} onChange={onChange} />
            }
        </>
    );
};

Input.defaultProps = {
    type: 'text',
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

export default Input;
