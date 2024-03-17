import React from 'react';

const ProgressRing = ({ score, children }: any) => {
  const size = 100; // SVG size
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2; // Adjust radius based on SVG size and stroke width
  const center = size / 2; // Center of the SVG
  const circumference = 2 * Math.PI * radius;
  const arcLength = (score / 100) * circumference; // Length of the arc based on the score
  const startAngle = -90; // Starting from top

  // Function to convert polar coordinates to Cartesian
  interface polarToCartesian {
    centerX: number;
    centerY: number;
    radius: number;
    angleInDegrees: number;
  }
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Function to describe the arc path
  // @ts-ignore
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  };

  // Calculate the end angle based on the score
  const endAngle = startAngle + (score / 100) * 180;

  return (
    <div
      className="relative inline-flex justify-center items-center p-2"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="progress-arc">
        <path
          d={describeArc(center, center, radius, startAngle, endAngle)}
          fill="none"
          stroke="goldenrod"
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="absolute">{children}</div>
    </div>
  );
};

export default ProgressRing;
