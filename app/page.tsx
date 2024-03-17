'use client';
import { useState } from 'react';
import { DynamicWidget } from '@/lib/dynamic';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  checkAddress,
  addAddressToLocalStorage,
  checkOuraKey,
  readENSNameByAddress,
} from '@/lib/dataHelpers';
import Link from 'next/link';
import ProgressRing from '@/components/progress-ring';

export default function Home({}) {
  // access context from dynamic widget about logged in status
  const { user, primaryWallet } = useDynamicContext();
  const [readinessData, setReadinessData] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onConnectOura = async () => {
    console.log('start oura auth flow', user, primaryWallet);
    const connectedAddress = getAddress();
    console.log(connectedAddress);

    const url = `${process.env.SERVER_URL}/promptOuraAuth?userAddress=${connectedAddress}`;

    // Make the HTTP request
    const ouraAuthUrl = await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log('Response from promptOuraAuth:', data.authUri);
        window.location.href = data.authUri;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    console.log('uri', ouraAuthUrl);
  };

  const getAddress = () => {
    const address = primaryWallet?.address;
    return address;
  };

  // check if it's an address used before
  const currentAddress = getAddress();
  if (currentAddress && !checkAddress(currentAddress)) {
    addAddressToLocalStorage(currentAddress);
  }

  const currentUsername = readENSNameByAddress(currentAddress);

  return (
    <div className=" items-center justify-between w-full p-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold w-full">
              {currentUsername
                ? `@${currentUsername}.gmready.eth`
                : '@CUSTOMENS.gmReady.eth'}
            </h2>
            <p className="text-md text-align-left w-full">Locked In...</p>
            <p className="text-6xl font-bold">...</p>
            <p>Login, grant access to oura and take back your data...</p>
            {!primaryWallet?.address && (
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <DynamicWidget />
              </div>
            )}
            <div>
              {getAddress() && !checkOuraKey(getAddress()) && (
                <div className="my-20 block items-center">
                  <Button onClick={() => onConnectOura()}>
                    Connect to Oura
                  </Button>
                </div>
              )}
              {getAddress() && checkOuraKey(getAddress()) && (
                <div className="my-20 block">
                  <Link href="/oura">
                    <Button>Continue</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>@steph.gmready.eth</CardTitle>
                <CardDescription>needs help</CardDescription>
              </CardHeader>
              <ProgressRing score={55}>
                <CardContent>55</CardContent>
              </ProgressRing>

              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>@dan.gmready.eth</CardTitle>
                <CardDescription>is doing great</CardDescription>
              </CardHeader>
              <ProgressRing score={82}>
                <CardContent>82</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>@teddy.gmready.eth</CardTitle>
                <CardDescription>is having a great day</CardDescription>
              </CardHeader>
              <ProgressRing score={92}>
                <CardContent>92</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>@raza.gmready.eth</CardTitle>
                <CardDescription>needs help</CardDescription>
              </CardHeader>
              <ProgressRing score={55}>
                <CardContent>55</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
