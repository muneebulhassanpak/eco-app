import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTemperature } from "../../store/temperature";

const WeatherForecast = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const APIURL = `https://api.weatherapi.com/v1/current.json?key=aee427805aae4829aad171833240802&q=${latitude},${longitude}`;

          const response = await fetch(APIURL);
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();

          const weatherData = {
            temperature: data.current.temp_c,
            cityName: data.location.name,
          };

          dispatch(updateTemperature(weatherData));
          setWeather(weatherData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [dispatch]);

  return (
    <div className="rounded-md border border-white px-4 py-1 bg-white text-black">
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <>
          <span className="font-medium uppercase">{weather.cityName}</span>{" "}
          <span>
            {weather.temperature}
            <sup>0</sup>C
          </span>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
