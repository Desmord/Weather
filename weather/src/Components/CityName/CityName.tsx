import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean, darkMode: boolean }>`
    grid-column: 2/4;
    grid-row: 2/3;
    font-size: 1rem;
    opacity: 0;
    transition:opacity 0.5s ease-in;

    ${({ isShown }) => isShown ? `
        opacity: 1;
    ` : `
        opacity: 0;
    `}

    ${({ isDisplay }) => isDisplay ? `
        display:grid;
        place-content:center;
    ` : `
        display:none;
    `}
`

const CurrentWeather = ({
    darkMode,
    displayWeather,
    cityName,
}: {
    darkMode: boolean,
    displayWeather: boolean,
    cityName: string,
}) => {

    const { isDisplay, isShown, } = useShowHide(displayWeather)

    return (
        <Container isDisplay={isDisplay} isShown={isShown} darkMode={darkMode}>
            {cityName}
        </Container>

    )
}

export default CurrentWeather