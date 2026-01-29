import "./common.css";
import loadingIcon from "../../assets/common/loading.svg";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = true,
  disabled = false,
  loading = false,
  icon,
}) => {

  const className = `
    common-button
    button-${variant}
    button-${size}
    ${fullWidth ? "button-full-width" : ""}
  `;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span className="button-spinner">
          <img src={loadingIcon} alt="loading" />
        </span>
      )}

      {!loading && icon && <span>{icon}</span>}

      {children}
    </button>
  );
};

export default Button;
