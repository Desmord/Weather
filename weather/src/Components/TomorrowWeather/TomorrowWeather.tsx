import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

import Icon from "../Icon/Icon";

// Icons
import { ReactComponent as CeliIconDark } from "../../icons/CDark.svg";
import { ReactComponent as CeliIconLight } from "../../icons/CLight.svg";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean, darkMode: boolean }>`
    position:relative;
    grid-column:3/4;
    grid-row:3/4;
    display:none;
    opacity: 0;
    font-size: 0.7rem;
    font-weight: 700;
    transition:opacity 0.5s ease-in;

    ${({ isShown }) => isShown ? `
        opacity: 0.8;
    ` : `
        opacity: 0;
    `}

    ${({ isDisplay }) => isDisplay ? `
        display:flex;
        justify-content: center;
        align-items:center;
        flex-direction:column;
    ` : `
        display:none;
    `}
`

const Temp = styled.div`
    font-size: 2rem;
    display:flex;
`

const CeliWrapper = styled.div`
    margin-top:-2px;
    width: 40px;
    height: 40px;
`

const SubProperties = styled.div`
    margin-top:2px;
    width: 200px;
    text-align: left;
`

const TomorrowWeather = ({
    darkMode,
    displayWeather,
    tomorrowWeather
}: {
    darkMode: boolean,
    displayWeather: boolean,
    tomorrowWeather: any
}) => {

    const { isDisplay, isShown, } = useShowHide(displayWeather)

    return (
        <Container isDisplay={isDisplay} isShown={isShown} darkMode={darkMode}>
            <Icon
                darkMode={darkMode}
                snow={tomorrowWeather.tomorrowSnow}
                rain={tomorrowWeather.tomorowRain}
                clouds={tomorrowWeather.tomorrowClouds}
                isTomorrow={true}
            />
            <Temp>
                {tomorrowWeather.tomorrowTemperature}
                <CeliWrapper>
                    {darkMode ? <CeliIconDark /> : <CeliIconLight />}
                </CeliWrapper>
            </Temp>
            <SubProperties>Wiatr: &nbsp;{tomorrowWeather.tomorrowWindSpeed} ms</SubProperties>
            <SubProperties> {tomorrowWeather.tomorrowSnow > 0 ? `Śnieg:  ${tomorrowWeather.tomorrowSnow} mm/hr` : ``}</SubProperties>
            <SubProperties>Opady:&nbsp; {tomorrowWeather.tomorrowRain} %</SubProperties>
            <SubProperties>Zachmurzenie: &nbsp; {tomorrowWeather.tomorrowClouds} %</SubProperties>
        </Container>

    )
}

export default TomorrowWeather