import "./common.css";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  helperText,
  required,
  disabled,
  icon,
  iconPosition = "left",
  maxLength,
}) => {

  const inputClass = `
    common-input
    ${icon && iconPosition === "left" ? "input-with-left-icon" : ""}
    ${icon && iconPosition === "right" ? "input-with-right-icon" : ""}
  `;

  return (
    <div className={`input-wrapper ${disabled ? "input-disabled" : ""}`}>

      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className={`input-container ${error ? "input-error" : ""}`}>

        {icon && iconPosition === "left" && (
          <span className="input-icon input-icon-left">{icon}</span>
        )}

        <input
          className={inputClass}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />

        {icon && iconPosition === "right" && (
          <span className="input-icon input-icon-right">{icon}</span>
        )}

        {maxLength && (
          <span className="input-char-count">
            {value?.length || 0}/{maxLength}
          </span>
        )}

      </div>

      {error && <span className="input-error-text">{error}</span>}
      {!error && helperText && (
        <span className="input-helper-text">{helperText}</span>
      )}

    </div>
  );
};

export default Input;
