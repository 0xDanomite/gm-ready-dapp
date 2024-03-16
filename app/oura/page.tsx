'use client';
import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  updateOuraKey,
  getOuraKey,
  readENSNameByAddress,
} from '@/lib/dataHelpers';

const formatDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const DataDisplay = ({ data }: any) => {
  return (
    <div>
      <h2>Readiness data:</h2>
      <strong>Day:</strong> {data.day}
      <ul style={{ marginLeft: '10px' }}>
        <li>
          <strong>ID:</strong> {data.id}
        </li>
        <li>
          <strong>Score:</strong> {data.score}
        </li>
        <li>
          <strong>Timestamp:</strong> {data.timestamp}
        </li>
        <li>
          <strong>Body Temperature:</strong> {data.body_temperature}
        </li>
        <li>
          <strong>Resting Heart Rate:</strong> {data.resting_heart_rate}
        </li>
        <li>
          <strong>HRV Balance:</strong> {data.hrv_balance}
        </li>
        <li>
          <strong>Sleep Balance:</strong> {data.sleep_balance}
        </li>
        <li>
          <strong>Activity Balance:</strong> {data.activity_balance}
        </li>
        <li>
          <strong>Previous Night:</strong> {data.previous_night}
        </li>
        <li>
          <strong>Recovery Index:</strong> {data.recovery_index}
        </li>
        <li>
          <strong>Previous Day Activity:</strong> {data.previous_day_activity}
        </li>
        <li>
          <strong>Temperature Deviation:</strong> {data.temperature_deviation}
        </li>
        <li>
          <strong>Temperature Trend Deviation:</strong>{' '}
          {data.temperature_trend_deviation}
        </li>
      </ul>
    </div>
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
    console.log(url);
    const ouraData = fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        setOuraData(data);
        console.log(data);
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
      const currentAddress = getAddress();
      console.log(currentAddress);
      const token = getOuraKey(getAddress());
      console.log(token);
      getOuraData(currentAddress, token);
      setUsername(readENSNameByAddress(currentAddress));
    }
  }, []);

  return (
    <div className="container">
      <h2>gm {username}</h2>
      {/* {getAddress() === ouraAddress && ouraData && 'Connected!'} */}
      {ouraData &&
        ouraData.map((d: any) => <DataDisplay key={d.id} data={d} />)}
    </div>
  );
}
