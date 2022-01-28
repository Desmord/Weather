import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

import Icon from "./Icon";

// Icons
import { ReactComponent as CeliIconDark } from "../../icons/CDark.svg";
import { ReactComponent as CeliIconLight } from "../../icons/CLight.svg";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean, darkMode: boolean }>`
    position:relative;
    grid-column:2/3;
    grid-row:3/4;
    display:none;
    opacity: 0;
    font-size: 0.8rem;
    font-weight: 700;
    transition:opacity 0.5s ease-in;

    ${({ darkMode }) => darkMode ?
        `
        border-right: 1px solid rgba(255,255,255,0.1);
        ` : `
        border-right: 1px solid rgba(0,0,0,0.15);
        `}
    // border-right: 1px solid rgba(255,255,255,0.1);
    // background-color: rgba(255,255,255,0.1);

    ${({ isShown }) => isShown ? `
        opacity: 1;
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
    font-size: 3rem;
    display:flex;
    padding-bottom: 20px;
`

const CeliWrapper = styled.div`
    margin-top: -5px;
    width: 50px;
    height: 50px;
`

const SubProperties = styled.div`
    margin-top:2px;
    width: 200px;
    text-align: left;
`

const DateText = styled.div`
    margin-top:15px;
    font-size: 1rem;
`

const CurrentWeather = ({
    darkMode,
    displayWeather,
    currentWeather
}: {
    darkMode: boolean,
    displayWeather: boolean,
    currentWeather: any
}) => {

    const { isDisplay, isShown, } = useShowHide(displayWeather)

    return (
        <Container isDisplay={isDisplay} isShown={isShown} darkMode={darkMode}>
            <Icon
                darkMode={darkMode}
                snow={currentWeather.snow}
                rain={currentWeather.rain}
                clouds={currentWeather.clouds}
            />
            <Temp>
                {currentWeather.temperature}
                <CeliWrapper>
                    {darkMode ? <CeliIconDark /> : <CeliIconLight />}
                </CeliWrapper>
            </Temp>
            <SubProperties>Wiatr: &nbsp;{currentWeather.windSpeed} ms</SubProperties>
            <SubProperties> {currentWeather.snow > 0 ? `Śnieg:  ${currentWeather.snow} mm/hr` : ``}</SubProperties>
            <SubProperties>Opady:&nbsp; {currentWeather.rain} %</SubProperties>
            <SubProperties>Zachmurzenie: &nbsp; {currentWeather.clouds} %</SubProperties>
            <SubProperties>Jakość powietrza: &nbsp; {currentWeather.airQualityIndex} / 500</SubProperties>
            <DateText>{
                `${String(new Date().getDate()).length > 1 ? new Date().getDate() : `0${new Date().getDate()}`}
                -${String(new Date().getMonth() + 1).length > 1 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`}
                -${new Date().getFullYear()}`
            }</DateText>
        </Container>

    )
}

export default CurrentWeather