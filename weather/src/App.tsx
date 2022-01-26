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

const Container = styled.div<{ darkMode: boolean }>`
  width: 100vw;
  height: 100vh;
  display:grid;
  grid-template-columns: 1fr 250px 250px 1fr;
  grid-template-rows: 1fr 100px 300px 1fr;

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
    grid-template-rows: 1fr 50px 300px 1fr;
  }

`

// adding weatyher utitlities
// current weather
// tommorow weather
// initial loading current and tomorow weather

const App = () => {

  const [darkMode, setDarkMode] = useState(true);

  const [displayLoader, setDisplayLoader] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [infoText, setInfoText] = useState(`Bład podczas połączenia spróbuj ponownie.`);
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
          windSpeed,
          temperature,
          airQualityIndex,
          rain,
          snow,
          clouds,
        })
        setTomorrowWeather({
          tomorrowWindSpeed,
          tomorrowTemperature,
          tomorrowRain,
          tomorrowSnow,
          tomorrowClouds,
        })
        setDisplayLoader(false)

      } catch (err) {
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
      </Container>
    </ThemeProvider>
  )
}

export default App