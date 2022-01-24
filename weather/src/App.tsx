import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalTheme } from './GlobalTheme'

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

const Asfgasf = styled.div`
  position: fixed;
  top:100px;
  left:100px;
  width: 100px;
  height: 100px;
  background-color: #fff;

`

const App = () => {

  const [darkMode, setDarkMode] = useState(true);

  const [displayLoader, setDisplayLoader] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [infoText, setInfoText] = useState(`Bład podczas połączenia spróbuj ponownie.`)


  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container darkMode={darkMode}>
        <Loader displayLoader={displayLoader} darkMode={darkMode} />
        <Info displayInfo={displayInfo} infoText={infoText} />
        <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
        <Asfgasf onClick={() => setDisplayLoader((prev: boolean) => !prev)}></Asfgasf>
      </Container>
    </ThemeProvider>
  )
}

export default App