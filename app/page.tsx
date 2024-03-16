'use client';
import { useState } from 'react';
import { DynamicWidget } from '../lib/dynamic';
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
} from '@/lib/dataHelpers';
import Link from 'next/link';

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

  return (
    <div className=" items-center justify-between w-full p-6 lg:px-8">
      <div>
        {getAddress() && !checkOuraKey(getAddress()) && (
          <div className="my-20 block items-center">
            <Button onClick={() => onConnectOura()}>Connect to Oura</Button>
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
      <div className="flex">
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>@steph.gmready.eth</CardTitle>
            <CardDescription>needs help</CardDescription>
          </CardHeader>
          <CardContent>55</CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>@dan.gmready.eth</CardTitle>
            <CardDescription>is doing great</CardDescription>
          </CardHeader>
          <CardContent>82</CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>@teddy.gmready.eth</CardTitle>
            <CardDescription>is having a great day</CardDescription>
          </CardHeader>
          <CardContent>92</CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>@raza.gmready.eth</CardTitle>
            <CardDescription>needs help</CardDescription>
          </CardHeader>
          <CardContent>52</CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </div>
  );
}
