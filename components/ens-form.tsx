'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { addENSNameToAddress } from '@/lib/dataHelpers';

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

interface NamesData {
  [name: string]: {
    addresses: {
      [chainId: string]: string;
    };
  };
}

export function ENSForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [namesData, setNamesData] = useState<NamesData>({});
  const [ownedNames, setOwnedNames] = useState<any>(null);
  const { isAuthenticated, user, primaryWallet } =
    useDynamicContext();
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    let processedUsername = username.toLowerCase(); // Convert username to lowercase
    if (processedUsername.length < 3) {
      setErrorMessage('Username must be at least 3 characters long.');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(processedUsername)) {
      setErrorMessage(
        'Username can only contain letters and numbers.'
      );
      return;
    }
    // Here you can perform any further actions with the username, such as sending it to a server
    console.log('Username set:', processedUsername);

    // Clear the input field and error message
    setUsername('');
    setErrorMessage('');

    console.log(primaryWallet);

    const connector = primaryWallet?.connector;

    console.log('connector', connector);

    const signer: any = await connector?.getSigner();

    console.log('signer', signer);

    const message = `Register ${processedUsername}.gmready.eth`;
    const signature = await signer.signMessage({
      message,
    });

    console.log('signature', signature);

    const ensName = `${processedUsername}.gmready.eth`;
    const requestBody: any = {
      name: ensName,
      owner: primaryWallet?.address,
      addresses: { '60': primaryWallet?.address },
      texts: { description: '' },
      signature: {
        hash: signature,
        message,
      },
    };

    try {
      const response = await fetch(
        'https://ens-gateway.gmready.workers.dev/set',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to set username');
      }

      console.log('Username set successfully:', processedUsername);
      addENSNameToAddress(primaryWallet?.address, ensName);
      setUsername('');
      setErrorMessage('');
      //   @ts-ignore
      router.push('/oura');
    } catch (error) {
      console.error('Error setting username:', error);
      setErrorMessage('Failed to set username. Please try again.');
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUsername(value);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="userName">
              Pick a username
            </Label>
            <Input
              id="userName"
              placeholder="steph"
              type="text"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Set Username
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
