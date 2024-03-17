import Link from 'next/link';
import { DynamicWidget } from '../lib/dynamic';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              gmReady?
            </span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <DynamicWidget />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
