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

export default function Home({}) {
  // access context from dynamic widget about logged in status
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();
  const [readinessData, setReadinessData] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onConnectOura = async () => {
    console.log('start oura auth flow', user, primaryWallet);
    const connectedAddress = getAddress();
    console.log(connectedAddress);

    const url = `http://localhost:8000/promptOuraAuth?userAddress==${connectedAddress}`;

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

  return (
    <div className="flex items-center justify-between w-full p-6 lg:px-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>GM Ready</CardTitle>
          <CardDescription>Readiness scores onchain</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicWidget />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button> */}
          {getAddress() && (
            <Button onClick={() => onConnectOura()}>Connect to Oura</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
