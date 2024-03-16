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
  const { isAuthenticated, user, primaryWallet } =
    useDynamicContext();
  const [readinessData, setReadinessData] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onConnectOura = () => {
    console.log('start oura auth flow', user, primaryWallet);
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
          <Button onClick={() => onConnectOura()}>
            Connect to Oura
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
