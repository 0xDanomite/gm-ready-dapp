'use client';
import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useSearchParams } from 'next/navigation';

export default function OuraPage({}) {
  // access context from dynamic widget about logged in status
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();

  const getAddress = () => {
    const address = primaryWallet?.address;
    return address;
  };

  const searchParams = useSearchParams();
  console.log(searchParams.get('state'));
  console.log(searchParams.get('code'));

  return (
    <div className="flex items-center justify-between w-full p-6 lg:px-8">
      {getAddress()}
    </div>
  );
}
