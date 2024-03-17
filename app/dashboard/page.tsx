'use client';
import { useReadContract } from 'wagmi';
import { abi } from '@/lib/healthDataStorageABI';

const contractAddress = '0x1dB119Edfc4cD5d307323f9D0701FbA5F3eE8b17';

export default function Dashboard({}) {
  // Automatically fetch health data using useContractRead
  const { data, isPending, error } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getHealthData',
    // args: ['03/16/2024'],
    // Watch mode to refetch on new blocks if needed. Remove if not necessary.
    // watch: true,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h1>Health Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
