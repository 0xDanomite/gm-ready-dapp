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
      <div className="max-w-5xl mx-auto px-4 py-8 grid  lg:grid-cols-1 gap-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold w-full text-center">
              {!!currentUsername
                ? `gm! welcome back ${currentUsername}`
                : 'onchain.gmReady.eth'}
            </h2>

            {!currentUsername && (
              <p className="my-5">
                gmReady collects your daily Oura ring (a wearable fitness
                tracker) sleep and health data and stores it onchain so you have
                access to it forever. All data is encrypted except your daily
                readiness score, which is intentionally sharable and attestable.
              </p>
            )}
            {!primaryWallet?.address && (
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <DynamicWidget innerButtonComponent={'Get started'} />
              </div>
            )}
            <div>
              {getAddress() && !checkOuraKey(getAddress()) && (
                <div className="my-10 block items-center">
                  <Button onClick={() => onConnectOura()}>
                    Connect to Oura
                  </Button>
                </div>
              )}
              {getAddress() && checkOuraKey(getAddress()) && (
                <div className="my-10 block">
                  <Link href="/oura">
                    <Button>Go to your data</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold w-full text-center">
            gmReady scores are onchain and social
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@steph.gmready.eth</CardTitle>
                <CardDescription>needs to touch grass</CardDescription>
              </CardHeader>
              <ProgressRing score={42}>
                <CardContent>42</CardContent>
              </ProgressRing>

              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@dan.gmready.eth</CardTitle>
                <CardDescription>is locked in</CardDescription>
              </CardHeader>
              <ProgressRing score={82}>
                <CardContent>82</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@luc.gmready.eth</CardTitle>
                <CardDescription>is thriving</CardDescription>
              </CardHeader>
              <ProgressRing score={92}>
                <CardContent>92</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@kartik.gmready.eth</CardTitle>
                <CardDescription>needs help</CardDescription>
              </CardHeader>
              <ProgressRing score={64}>
                <CardContent>64</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@abena.gmready.eth</CardTitle>
                <CardDescription>is thriving</CardDescription>
              </CardHeader>
              <ProgressRing score={99}>
                <CardContent>99</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full justify-center items-center flex flex-col">
              <CardHeader>
                <CardTitle>@simon.gmready.eth</CardTitle>
                <CardDescription>needs help</CardDescription>
              </CardHeader>
              <ProgressRing score={69}>
                <CardContent>69</CardContent>
              </ProgressRing>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
