import { css } from '@emotion/react';


interface ButtonProps {
  children: React.ReactNode;
  color: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick: () => void;
}

const Button = ({ children, color, disabled, type, onClick }: ButtonProps) => {
  const disabledColor = "#111111";
  return (
    <button type={type || "button"} css={disabled ? baseButtonStyle : buttonStyle} style={{ backgroundColor: disabled ? disabledColor : color }} onClick={() => onClick()} disabled={disabled} aria-label={(children as string)}>
      {children}
    </button>
  );
};

const baseButton = {
  padding: "var(--size-s)",
  borderRadius: "3px",
  minWidth: "60px",
}

const baseButtonStyle = css({
  ...baseButton,
  userSelect: 'none',
});

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
  userSelect: 'none',
})

export default Button;