import React from 'react';
import { css } from '@emotion/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div css={modalStyle} onClick={onClose} style={{opacity: isOpen ? 1 : 0, zIndex: isOpen ? 1 : -1}}>
      <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const modalStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  transition: 'all .5s',
  opacity: 0
})

const modalContentStyle = css({
  backgroundColor: "#2e2e2e",
  padding: "var(--size-l)",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "calc(var(--content-height) * 10)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

export default Modal;
