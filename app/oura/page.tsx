'use client';
import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  updateOuraKey,
  getOuraKey,
  readENSNameByAddress,
} from '@/lib/dataHelpers';
import OuraDisplay from '@/components/oura-display';
import { encryptStringWithSalt } from '@/lib/starterEncryption';
import { abi } from '@/lib/abi';
import { useContractReads, useContractWrite } from 'wagmi';
import { Button } from '@/components/ui/button';

const readinessContract = {
  address: '0x37241b8045D846Db234C214BAc22f809cE4Dbdc6',
  abi,
};

const formatDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const DataDisplay = ({ data, address }: any) => {
  const [hookHasRun, setHookHasRun] = useState(false);
  const [toggleHook, setToggleHook] = useState(false);

  const { primaryWallet } = useDynamicContext();

  const handleSubmit = async () => {
    console.log(primaryWallet);

    const connector = primaryWallet?.connector;

    console.log('connector', connector);

    const client: any = await connector?.getWalletClient('84532');

    console.log('client', client);

    const plaintext = 'Sensitive information';

    var salt = prompt(
      '🧂 Encrypt with a salt - similar to a password that protects your readiness data'
    );

    if (!salt) {
      return;
    }

    const encryptedHealthData = await encryptStringWithSalt(plaintext, salt)
      .then((ciphertext) => {
        const ciphertextStr = Array.prototype.map
          .call(new Uint8Array(ciphertext), (x) =>
            ('00' + x.toString(16)).slice(-2)
          )
          .join('');
        console.log(ciphertextStr);
        return ciphertextStr;
      })
      .catch((error) => {
        console.error('Encryption Error:', error);
      });

    const hash = await client.writeContract({
      ...readinessContract,
      account: address,
      functionName: 'storeHealthData',
      args: [data.day, encryptedHealthData, data.score],
    });
  };

  const {
    data: contractData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...readinessContract,
        functionName: 'getHealthData',
        args: [address, data.day],
      } as any,
    ],
  });
  // @ts-ignore
  const onchainDataExists =
    // @ts-ignore
    contractData && contractData[0]?.result?.ouraHealthDataBlob?.length > 0;

  return (
    <>
      <div>
        <h2>Readiness data:</h2>
        {!onchainDataExists ? (
          <Button onClick={handleSubmit}>Store onchain</Button>
        ) : (
          <a
            href="https://sepolia.basescan.org/address/0x37241b8045D846Db234C214BAc22f809cE4Dbdc6#readContract"
            target="_blank"
            className="underline"
          >
            🔵 Based
          </a>
        )}
      </div>
      <OuraDisplay ouraData={data} />
    </>
  );
};

export default function OuraPage({}) {
  const router = useRouter();
  // access context from dynamic widget about logged in status
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();
  const [ouraAddress, setOuraAddress] = useState(null);
  const [ouraData, setOuraData] = useState([]);
  const [username, setUsername] = useState('');

  const getAddress = () => {
    const address = primaryWallet?.address;
    return address;
  };
  const searchParams = useSearchParams();

  const getOuraData = (address: any, ouraToken: any) => {
    const url = `${process.env.SERVER_URL}/getReadinessData/${formatDate(
      30
    )}/${formatDate()}?access_token=${ouraToken}&state=${address}`;
    const ouraData = fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        setOuraData(data);
        return data.reverse();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const fragment = window.location.hash;
    // read token and account from url ()
    if (fragment.length) {
      const accessToken = new URLSearchParams(fragment.slice(1)).get(
        'access_token'
      );
      const oa: any = new URLSearchParams(fragment.slice(1)).get('state');
      setOuraAddress(oa);

      updateOuraKey(oa, accessToken);
      router.push('/ens');
    } else {
      // reuse token - read from local storage
      const currentAddress = primaryWallet?.address;
      const token = getOuraKey(primaryWallet?.address);
      // @ts-ignore
      setOuraAddress(currentAddress);
      getOuraData(currentAddress, token);
      setUsername(readENSNameByAddress(currentAddress));
    }
  }, [primaryWallet]);

  const {
    data: contractData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...readinessContract,
        functionName: 'getHealthData',
        args: [primaryWallet?.address, '2023-03-09'],
      } as any,
    ],
  });

  return (
    <div className="container mt-5 grid grid-cols-2 gap-5 sm:grid-cols-1">
      {username ? <h2>gm {username}</h2> : 'Loading...'}
      {/* {primaryWallet?.address === ouraAddress && ouraData && 'Connected!'} */}
      {ouraData &&
        ouraData.map((d: any) => (
          <DataDisplay key={d.id} data={d} address={ouraAddress} />
        ))}
    </div>
  );
}
