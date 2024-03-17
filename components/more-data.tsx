export interface Contributors {
  activity_balance: number;
  body_temperature: number;
  hrv_balance: number;
  previous_day_activity: number;
  previous_night: number;
  recovery_index: number;
  resting_heart_rate: number;
  sleep_balance: number;
}

export interface OuraData {
  contributors: Contributors;
  day: string;
  id: string;
  score: number;
  temperature_deviation: number;
  temperature_trend_deviation: number;
  timestamp: string;
}

export const MoreData = ({ ouraData }: { ouraData: OuraData }) => {
  return (
    <ul className="grid grid-cols-3 gap-x-8 sm:grid-cols-1 text-center">
      <li>Activity Balance: {ouraData.contributors?.activity_balance}</li>
      <li>Body Temperature: {ouraData.contributors?.body_temperature}</li>
      <li>HRV Balance: {ouraData.contributors?.hrv_balance}</li>
      <li>
        Previous Day Activity: {ouraData.contributors?.previous_day_activity}
      </li>
      <li>Previous Night: {ouraData.contributors?.previous_night}</li>
      <li>Recovery Index: {ouraData.contributors?.recovery_index}</li>
      <li>Resting Heart Rate: {ouraData.contributors?.resting_heart_rate}</li>
      <li>Sleep Balance: {ouraData.contributors?.sleep_balance}</li>
      <li>Temperature Deviation: {ouraData.temperature_deviation}</li>
    </ul>
  );
};
