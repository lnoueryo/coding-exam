import { css } from '@emotion/react';


interface ButtonProps {
  children: React.ReactNode;
  color: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, color, disabled, onClick }: ButtonProps) => {
  const disabledColor = "#111111";
  return (
    <button css={disabled ? baseButtonStyle : buttonStyle} style={{ backgroundColor: disabled ? disabledColor : color }} onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  );
};

const baseButton = {
  padding: "var(--size-s)",
  borderRadius: "3px",
  minWidth: "60px",
}

const baseButtonStyle = css(baseButton)

const buttonStyle = css({
  transition: "all .5s",
  cursor: "pointer",
  "&:hover": {
    opacity: "0.6",
    transition: "all .5s"
  },
  "&:active": {
    opacity: "0.9",
    transition: "all .2s"
  },
  ...baseButton,
})

export default Button;