import React from 'react';

interface MonogramLogoProps {
  size?: number;
  leftLetter?: string;
  rightLetter?: string;
  centerText?: string;
  className?: string;
}

export default function MonogramLogo({
  size = 120,
  leftLetter = 'Z',
  rightLetter = 'R',
  centerText = 'ZEPMEUSEL',
  className = '',
}: MonogramLogoProps) {
  return (
    <div
      className={`monogram-logo ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <circle
          cx="100"
          cy="100"
          r="88"
          stroke="var(--color-gold)"
          strokeWidth="3.5"
          fill="transparent"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="rgba(212, 176, 106, 0.3)"
          strokeWidth="1.5"
          fill="transparent"
        />
        
        {/* Left Letter */}
        <text
          x="72"
          y="132"
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontSize="95"
          fill="#FFFFFF"
          fontWeight="700"
          textAnchor="middle"
          style={{ letterSpacing: '-0.05em' }}
        >
          {leftLetter}
        </text>

        {/* Right Letter */}
        <text
          x="128"
          y="132"
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontSize="95"
          fill="var(--color-gold)"
          fontWeight="700"
          textAnchor="middle"
          style={{ letterSpacing: '-0.05em' }}
        >
          {rightLetter}
        </text>
      </svg>
    </div>
  );
}
