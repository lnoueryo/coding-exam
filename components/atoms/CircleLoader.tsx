import React from 'react';
import { css, keyframes } from '@emotion/react';

interface CircleLoaderProps {
  size?: number;
  color?: string;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loaderStyle = (size: number, color: string) => css`
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  border: ${size / 10}px solid ${color};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${rotate} 1s linear infinite;
`;

const CircleLoader: React.FC<CircleLoaderProps> = ({ size = 50, color = '#00f' }) => {
  return <div css={loaderStyle(size, color)} />;
};

export default CircleLoader;
