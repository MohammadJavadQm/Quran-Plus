// File: components/ui/NewLogo.js
import React from 'react';

const NewLogo = ({ width = 40, darkMode }) => {
  return (
    <svg width={width} height={width} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="128" fill="#181818" />
      <g transform="translate(102.4, 76.8)">
        <path d="M153.6,0l153.6,88.7v177.3L153.6,354.7L0,266V88.7L153.6,0z" fill="#D4CA7E" />
        <path d="M153.6,30.3L275.6,99.9v140L153.6,30.3z" fill="#a7c957" />
        <path d="M153.6,30.3L31.6,99.9v140L153.6,30.3z" fill="#4a6d3b" />
        <path d="M153.6,30.3L275.6,99.9l-122-69.6z" fill="#D4CA7E" />
        <path d="M153.6,30.3L31.6,99.9l122-69.6z" fill="#4a6d3b" />
        <path d="M307.2,88.7L153.6,177.3l-153.6-88.6L153.6,0L307.2,88.7z" fill="#a7c957" />
        <path d="M153.6,266L0,177.3l153.6-88.6L307.2,177.3L153.6,266z" fill="#D4CA7E" />
        <path d="M153.6,354.7L0,266l153.6-88.7l153.6,88.7L153.6,354.7z" fill="#4a6d3b" />
        <text x="153.6" y="177.3" textAnchor="middle" alignmentBaseline="central" fontSize="30" fill="#FFFF00" fontFamily="Arial, sans-serif" transform="translate(0, -10)">الله</text>
      </g>
    </svg>
  );
};

export default NewLogo;
