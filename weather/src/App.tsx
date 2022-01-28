import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalTheme } from './GlobalTheme'
import {
  getPosition,
  getCurrentWeather,
  getTomorrowWeather,
} from './WeatherUtilities'

// Components
import Loader from "./Components/Loader/Loader";
import ModeSwitch from "./Components/ModeSwitch/ModeSwitch";
import Info from "./Components/Info/Info";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import CityName from './Components/CityName/CityName'
import TomorrowWeather from "./Components/TomorrowWeather/TomorrowWeather";
import Dates from "./Components/Dates/Dates";

const Container = styled.div<{ darkMode: boolean }>`
  width: 100vw;
  height: 100vh;
  display:grid;
  grid-template-columns: 1fr 250px 250px 1fr;
  grid-template-rows: 1fr 50px 320px 30px 1fr;

  ${({ theme, darkMode }) => darkMode ?
    `
    background-color: ${theme.colors.dark.appBackground};
    color: ${theme.colors.dark.fontColor};
    ` : `
    background-color: ${theme.colors.light.appBackground};
    color: ${theme.colors.light.fontColor};
    `}


  @media all and (max-width: 540px){
    grid-template-columns: 1fr 200px 200px 1fr;
    grid-template-rows: 1fr 40px 300px 30px 1fr;
  }

`

const App = () => {

  const [darkMode, setDarkMode] = useState(true);

  const [displayLoader, setDisplayLoader] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [infoText, setInfoText] = useState(`Bład podczas połączenia spróbuj ponownie.`);
  const [displayWeather, setDisplayWeather] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    city_name: ``, windSpeed: 0, temperature: 0,
    airQualityIndex: 0, rain: 0, snow: 0, clouds: 0,
  });
  const [tomorrowWeather, setTomorrowWeather] = useState({
    tomorrowWindSpeed: 0, tomorrowTemperature: 0, tomorrowRain: 0,
    tomorrowSnow: 0, tomorrowClouds: 0,
  });

  useEffect(() => {

    const getData = async () => {

      try {
        const { lon, lat, error }: { lon: number, lat: number, error: boolean } = await getPosition();

        if (error) throw new Error(`Bład podczas pobierania lokalizacji urządzenia.`)

        const {
          city_name, windSpeed, temperature, airQualityIndex,
          rain, snow, clouds, currentWeatherError,
        }: {
          city_name: string, windSpeed: number, temperature: number, airQualityIndex: number,
          rain: number, snow: number, clouds: number, currentWeatherError: boolean,
        } = await getCurrentWeather(lat, lon);

        if (currentWeatherError) throw new Error(`Bład podczas pobierania aktualnej prognozy pogody.`)

        const {
          tomorrowWindSpeed, tomorrowTemperature, tomorrowRain,
          tomorrowSnow, tomorrowClouds, tomorrowWeatherError,
        }: {
          tomorrowWindSpeed: number, tomorrowTemperature: number, tomorrowRain: number,
          tomorrowSnow: number, tomorrowClouds: number, tomorrowWeatherError: any,
        } = await getTomorrowWeather(lat, lon);

        if (tomorrowWeatherError) throw new Error(`Błąd podczas pobierania jutrzejszej prognozy pogody.`)

        setCurrentWeather({
          city_name,
          windSpeed: parseFloat(windSpeed.toFixed(2)),
          temperature: parseFloat(temperature.toFixed(2)),
          airQualityIndex: parseFloat(airQualityIndex.toFixed(2)),
          rain: parseFloat(rain.toFixed(2)),
          snow: parseFloat(snow.toFixed(2)),
          clouds: parseFloat(clouds.toFixed(2)),
        })
        setTomorrowWeather({
          tomorrowWindSpeed: parseFloat(tomorrowWindSpeed.toFixed(2)),
          tomorrowTemperature: parseFloat(tomorrowTemperature.toFixed(2)),
          tomorrowRain: parseFloat(tomorrowRain.toFixed(2)),
          tomorrowSnow: parseFloat(tomorrowSnow.toFixed(2)),
          tomorrowClouds: parseFloat(tomorrowClouds.toFixed(2)),
        })
        setDisplayLoader(false)
        setDisplayWeather(true);

      } catch (err) {
        setDisplayLoader(false)
        setInfoText(`${err}`);
        setDisplayInfo(true);
      }

    }

    getData();
  }, [])

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container darkMode={darkMode}>
        <Loader displayLoader={displayLoader} darkMode={darkMode} />
        <Info displayInfo={displayInfo} infoText={infoText} />
        <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
        <CityName
          cityName={currentWeather.city_name}
          darkMode={darkMode}
          displayWeather={displayWeather} />
        <CurrentWeather
          darkMode={darkMode}
          currentWeather={currentWeather}
          displayWeather={displayWeather} />
        <TomorrowWeather
          darkMode={darkMode}
          tomorrowWeather={tomorrowWeather}
          displayWeather={displayWeather} />
        <Dates displayWeather={displayWeather} />
      </Container>
    </ThemeProvider>
  )
}

export default App