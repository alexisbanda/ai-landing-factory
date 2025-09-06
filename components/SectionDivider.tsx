import React from 'react';

const SectionDividerComponent: React.FC = () => {
  return (
    <div className="pointer-events-none relative mx-auto my-8 h-[75px] w-full max-w-[630px] md:my-12 xl:my-16">
      <svg
        viewBox="0 0 630 75"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain h-full w-full"
        aria-hidden="true"
      >
        <path d="M0 37.5 H 290" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M630 37.5 H 340" stroke="#E2E8F0" strokeWidth="1.5" />
        <path
          d="M290 37.5 C 300 37.5, 305 25, 315 25 C 325 25, 330 37.5, 340 37.5"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="315" cy="25" r="4" fill="#3B82F6" />
      </svg>
    </div>
  );
};

const SectionDivider = React.memo(SectionDividerComponent);

export default SectionDivider;