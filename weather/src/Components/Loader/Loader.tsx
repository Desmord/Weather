import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position:relative;
  grid-column:2/4;
  grid-row:2/3;
  display:flex;
  justify-content: center;
  align-items:center;
`


const Bounce = keyframes`
     0% {
          top: 50px;
          height: 12px;
          border-radius: 80px 80px 30px 30px;
          transform: scaleX(2);
        };
        35% {
          height: 50px;
          border-radius: 50%;
          transform: scaleX(1);
        };
        100% {
          top: 0;
        };
`

const Bounceball = styled.div<{ darkMode: boolean }>`
  position: relative;
  display: inline-block;
  height: 100px;
  width: 80px;

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform-origin: 50%;
    animation: ${Bounce} 0.8s alternate infinite ease;

    ${({ theme, darkMode }) => darkMode ?
    `
    background-color: ${theme.colors.dark.bounceBallBackground};
    ` : `
    background-color:${theme.colors.light.bounceBallBackground};
    `}

`


const Text = styled.div<{ darkMode: boolean }>`
    font-weight: 700px;
    font-size: 1.5rem;

    ${({ theme, darkMode }) => darkMode ?
    `
    color: ${theme.colors.dark.fontColor};
    ` : `
    color: ${theme.colors.light.fontColor};
    `}
`




const Loader = ({ darkMode }: { darkMode: boolean }) => {

  return (
    <Container  >
      <Bounceball darkMode={darkMode}></Bounceball>
      <Text darkMode={darkMode}>Wczytywanie...</Text>
    </Container >
  )
}

export default Loader