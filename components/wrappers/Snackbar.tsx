import React, { useEffect, useRef  } from 'react';
import { css } from '@emotion/react';

type SnackbarProps = {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  time?: number;
  children: React.ReactNode;
};

const Snackbar = ({ isOpen, onClose, color, time, children }: SnackbarProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onClose, time || 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen]);
  return (
    <div css={snackbarStyle} style={{backgroundColor: color, bottom: isOpen ? "16px" : "-50%"}}>
      <div css={contentStyle}>
        {children}
      </div>
    </div>
  );
};

const snackbarStyle = css({
  position: "fixed",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "192px",
  textAlign: "center",
  borderRadius: "3px",
  transition: "all .5s"
})

const contentStyle = css({
  padding: "var(--size-m)"
})


export default Snackbar;
