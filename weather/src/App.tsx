import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalTheme } from './GlobalTheme'

// Components
import Loader from "./Components/Loader/Loader";

const Container = styled.div<{ darkMode: boolean }>`
  width: 100vw;
  height: 100vh;
  display:grid;
  grid-template-columns: 1fr 250px 250px 1fr;
  grid-template-rows: 100px 400px;

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
    grid-template-rows: 1fr 350px 1fr;
  }

`


const App = () => {

  const [darkMode, setDarkMode] = useState(true)


  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container darkMode={darkMode}>
        <Loader />
      </Container>
    </ThemeProvider>
  )
}

export default App