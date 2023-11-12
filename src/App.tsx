import "./App.css";
import { useState, useEffect } from "react";

const API_KEY: string = "920e3e4ff64c8dc8a9f87cedbcf4fb16";

type FetchError = {
  evoked: boolean;
  message?: string;
};

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");

  const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError>({ evoked: false });

  useEffect(() => {
    let ignore = false;

    const getWeatherData = async () => {
      setLoading(true);
      try {
        setError({ evoked: false });

        if (city == "") throw new Error(`Provide city name`);

        const response = await fetch(url).then((response) => response.json());

        if (response.cod === "404") {
          throw new Error(`City '${city}' not found!`);
        }

        if (!ignore) {
          console.log(response);
        }
      } catch (err) {
        setError({
          evoked: true,
          message: (err as Error).message,
        });
      }

      setLoading(false);
    };

    getWeatherData();

    return () => {
      ignore = true;
    };
  }, [url, city]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <input
        type="text"
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />

      {!error.evoked ? <h1>Hello world</h1> : <h1>Error: {error.message}</h1>}
    </>
  );
};

export default App;
