import React from 'react';
import { FaceSmileIcon, FaceFrownIcon } from '@heroicons/react/24/outline';

// Define an interface for the ouraData object
interface OuraData {
  id: number;
  score: number;
  day: string;
}

// Define props for the OuraDisplay component
interface OuraDisplayProps {
  ouraData: OuraData;
  onchain: any;
}

const OuraDisplay: React.FC<OuraDisplayProps> = ({ ouraData, onchain }) => {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900"></h3>
      <dl className="w-full">
        <div
          key={ouraData.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-black p-3">
              {ouraData.score > 70 ? (
                <FaceSmileIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              ) : (
                <FaceFrownIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="absolute right-5 top-0">{onchain}</div>

            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {ouraData.day}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {ouraData.score}
            </p>

            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-black">
                  View more data
                  <span className="sr-only"> {ouraData.score} score</span>
                </a>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default OuraDisplay;
