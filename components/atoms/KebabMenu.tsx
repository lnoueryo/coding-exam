import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";

interface KebabMenuProps {
  options: Option[]
}
interface Option {
  text: string;
  onClick: () => void;
}

const KebabMenu = ({options}: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const onClickOption = (option: Option) => {
    option.onClick();
    setIsOpen(false);
  }

  return (
    <div ref={menuRef} css={menuContainerStyle}>
      <button onClick={toggleMenu} css={buttonStyle} aria-label="ドロップダウン">
        &#8942;
      </button>
      {isOpen && (
        <div css={dropdownStyle}>
          {
            options.map(option => <button css={dropdownItemStyle} onClick={() => onClickOption(option)} aria-label={option.text}>{option.text}</button>)
          }
        </div>
      )}
    </div>
  );
};

const menuContainerStyle = css({
  position: "relative",
  display: "inline-block",
});

const buttonStyle = css({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
  padding: "8px",
});

const dropdownStyle = css({
  position: "absolute",
  top: "100%",
  right: "0",
  background: "#2e2e2e",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  zIndex: 1000,
});

const dropdownItemStyle = css({
  display: "block",
  width: "100%",
  padding: "var(--size-s)",
  background: "none",
  border: "none",
  cursor: "pointer",
  transition: "all .5s",
  wordBreak: "keep-all",
  minWidth: "60px",
  textAlign: "center",
  "&:active": {
    backgroundColor: "#808080",
  },
});

export default KebabMenu;
