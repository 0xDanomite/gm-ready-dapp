'use client';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/20/solid';
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  FaceSmileIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export default function OuraDisplay({ ouraData }: { ouraData: any }) {
  console.log('ouraData', ouraData);
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {/* Last 7 days */}
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* {ouraData.map((ouraData: any) => ( */}
        <div
          key={ouraData.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
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
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View more data
                  <span className="sr-only">
                    {' '}
                    {ouraData.score} score
                  </span>
                </a>
              </div>
            </div>
          </dd>
        </div>
        {/* ))} */}
      </dl>
    </div>
  );
}