import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  let urlWheather =
    "https://api.openweathermap.org/data/2.5/weather?appid=2607e87dbdcc775518e3f84150bd890a&lang=es";
  let cityUrl = "&q=";

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=2607e87dbdcc775518e3f84150bd890a&lang=es";

  const [weather, setWheather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    //wheater

    urlWheather = urlWheather + cityUrl + loc;

    await fetch(urlWheather)
      .then((response) => {
        // eslint-disable-next-line no-throw-literal
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        setWheather(weatherData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });

    // Forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        // eslint-disable-next-line no-throw-literal
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        setForecast(forecastData);

        setLoading(false);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;
