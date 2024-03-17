'use client';
import { useWriteContract } from 'wagmi';
import { abi } from '@/lib/healthDataStorageABI';

const contractAddress = '0x1dB119Edfc4cD5d307323f9D0701FbA5F3eE8b17';

export default function Blockchain({}) {
  const { data: hash, isPending, writeContract } = useWriteContract();

  const postData = () => {
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: 'storeHealthData',
      args: ['03/16/2024', '{"data":"example"}'],
    });
  };

  if (!hash) return <div>No data found</div>;

  return (
    <div>
      <button disabled={isPending} onClick={() => postData()}>
        {isPending ? 'Posting...' : 'Post Data'}
      </button>
      <pre>Transaction: {hash}</pre>
    </div>
  );
}
