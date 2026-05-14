import { useId } from 'react';

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = '' }: LogoIconProps) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="30"
          y1="0"
          x2="30"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#035A69" />
        </linearGradient>
      </defs>
      <path
        d="M14.975 4.05C12.7226 6.25153 10.9852 8.92414 9.88738 11.8762C8.78953 14.8283 8.35844 17.9867 8.625 21.125C9.5 32.125 19.9 41.1 29.325 41.1C38.075 41.1 41.525 33.45 40.675 28.25C40.3629 26.3
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
