import React, { FC } from 'react';

interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon: FC<ArrowIconProps> = ({ className }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className={className}>
    <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
