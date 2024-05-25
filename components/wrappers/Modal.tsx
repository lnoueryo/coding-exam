import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMouseDownOutside, setIsMouseDownOutside] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => e.target === e.currentTarget && setIsMouseDownOutside(true);

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDownOutside && e.target === e.currentTarget) onClose();
    setIsMouseDownOutside(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
          return;
        }

        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
          return;
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateTabIndexes = (elements: NodeListOf<Element>, tabIndexValue: string) => {
      elements.forEach(element => {
        (element as HTMLElement).setAttribute("tabindex", tabIndexValue);
      });
    };

    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (isOpen) {
        updateTabIndexes(focusableElements, "0"); // フォーカスを有効にする
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      } else {
        updateTabIndexes(focusableElements, "-1"); // フォーカスを無効にする
      }
    }

    const focusableElementsOutsideModal = Array.from(
      document.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !modalRef.current?.contains(el));

    if (isOpen) {
      focusableElementsOutsideModal.forEach(element => {
        (element as HTMLElement).setAttribute("data-old-tabindex", (element as HTMLElement).getAttribute("tabindex") || "0");
        (element as HTMLElement).setAttribute("tabindex", "-1");
      });
    } else {
      focusableElementsOutsideModal.forEach(element => {
        const oldTabIndex = (element as HTMLElement).getAttribute("data-old-tabindex");
        if (oldTabIndex === "0") (element as HTMLElement).removeAttribute("tabindex");
        else (element as HTMLElement).setAttribute("tabindex", oldTabIndex || "0");
        (element as HTMLElement).removeAttribute("data-old-tabindex");
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) modalRef.current.style.display = "block";
      else setTimeout(() => {
        if(modalRef.current) modalRef.current.style.display = "none";
      }, 500);
    }
  }, [isOpen])

  return (
    <div
      id="modal-root"
      css={modalStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ opacity: isOpen ? 1 : 0, zIndex: isOpen ? 1 : -1 }}
    >
      <div
        ref={modalRef}
        css={modalContentStyle}
        onClick={(e) => e.stopPropagation()}
      >
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
  transition: "all .5s",
  opacity: 0,
});

const modalContentStyle = css({
  backgroundColor: "#2e2e2e",
  padding: "var(--size-l)",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "calc(var(--content-height) * 10)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

export default Modal;
