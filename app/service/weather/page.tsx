"use client";

import { useState, useEffect } from "react";

//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

interface WeatherType {
    latitude: number;
    longitude: number;
}


const Weather = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [location, setLocation] = useState<WeatherType>({ latitude: 0, longitude:0});

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log(latitude, longitude);
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchData();
    }
  }, [location]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Weather data...</p>;
  return (
    <main className="container min-h-screen mx-auto mt-8">
      <h1 className="text-3xl text-center font-bold mb-4">
        Weather Information
      </h1>
      <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {data?.name}, {data.sys?.country}
        </h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Temperature: {data?.main?.temp} C</p>
          <p className="text-gray-600">
            Feels Like: {data?.main?.feels_like} C
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Min Temperature: {data?.main?.temp_min} C
          </p>
          <p className="text-gray-600">
            Max Temperature: {data?.main?.temp_max} C
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Humidity: {data?.main?.humidity}%</p>
          <p className="text-gray-600">Cloudiness: {data?.clouds?.all}%</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Wind Speed: {data?.wind?.speed} m/s</p>
          <p className="text-gray-600">Wind Direction: {data?.wind?.deg}°</p>
        </div>

        <p className="text-gray-600">
          Description: {data?.weather[0]?.description}
        </p>
      </div>
    </main>
  );
};

export default Weather;
