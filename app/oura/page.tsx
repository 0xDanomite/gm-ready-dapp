'use client';
import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const processSillyAdressParam = (addressStr: any) => {
  if (addressStr && addressStr.charAt(0) === '=') {
    return addressStr.substring(1); // Remove the '=' character
  } else {
    return addressStr; // Return the string as is
  }
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

  const getAddress = () => {
    const address = primaryWallet?.address;
    return address;
  };
  const searchParams = useSearchParams();

  useEffect(() => {
    const oa = processSillyAdressParam(searchParams.get('state'));
    setOuraAddress(oa);

    const fragment = window.location.hash;

    // Parse the fragment to extract the value of access_token
    const accessToken = new URLSearchParams(fragment.slice(1)).get(
      'access_token'
    );

    const url = `https://gm-ready.onrender.com/getReadinessData/2024-03-08/2024-03-15?access_token=${accessToken}&state=${oa}`;
    console.log(url);
    const ouraData = fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        setOuraData(data);
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>ZZZs</h2>
      {getAddress() === ouraAddress && ouraData && 'Connected!'}
      {ouraData &&
        ouraData.map((d: any) => <DataDisplay key={d.id} data={d} />)}
    </div>
  );
}
