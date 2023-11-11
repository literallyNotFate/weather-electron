import './App.css'
import { useState, useEffect } from 'react'

type FetchError = {
  evoked: boolean,
  message?: string
}

const App: React.FC = () => {
  const key: string = '920e3e4ff64c8dc8a9f87cedbcf4fb16'
  const city: string = "Berlin"
  const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`


  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<FetchError>({evoked: false})


  useEffect(() => {
    let ignore = false;
    
    const getWeatherData = async () => {
      setLoading(true);
      try {
        setError({evoked: false});
        const response = await fetch(url).then(response => response.json());
    
        if(response.cod === '404') {
          throw new Error(`City '${city}' not found! You have to introduce a valid city name.`)
        }
    
        if (!ignore) {
          console.log(response)
        }
      } catch (err) {
        setError({
          evoked: true,
          message: (err as Error).message
        });
      }
    
      setLoading(false);
    };
    
    getWeatherData();
    
    return (() => { ignore = true; });
  }, [url]);
        
    
  if(loading) return <h1>Loading...</h1>
  if(error.evoked) return <h1>Error: {error.message}</h1>;
    
  return (
    <>
      <h1>Hello world</h1>
    </>
  )
}

export default App