import axios from 'axios';
import { useEffect, useState } from 'react';

const AppDesign = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://weather-wizard-e39d.onrender.com/current'
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching weather data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching weather data.</p>
      ) : (
        <>
          <p>Temperature: {data?.current?.temp_c}°C</p>
          <p>Condition: {data?.current?.condition?.text}</p>
        </>
      )}
    </>
  );
};

export default AppDesign;
