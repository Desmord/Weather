import styled from "styled-components";


// // Icons
import { ReactComponent as HeavySnowDark } from '../../icons/heavySnowDark.svg'
import { ReactComponent as HeavySnowLight } from '../../icons/heavySnowLight.svg'

import { ReactComponent as HeavyRainDark } from '../../icons/heavyRainDark.svg';
import { ReactComponent as HeavyRainLight } from '../../icons/heavyRainLight.svg';

import { ReactComponent as SnowDark } from '../../icons/snowDark.svg';
import { ReactComponent as SnowLight } from '../../icons/snowLight.svg';

import { ReactComponent as RainDark } from '../../icons/rainDark.svg';
import { ReactComponent as RainLight } from '../../icons/rainLight.svg';

import { ReactComponent as HeavyCloundsDark } from '../../icons/heavyCloundsDark.svg';
import { ReactComponent as HeavyCloundsLight } from '../../icons/heavyCloundsLight.svg';

import { ReactComponent as CloudDark } from '../../icons/cloudDark.svg';
import { ReactComponent as CloudLight } from '../../icons/cloudLight.svg';

import { ReactComponent as SunCloundsDark } from '../../icons/sunCloundsDark.svg';
import { ReactComponent as SunCloundsLight } from '../../icons/sunCloundsLight.svg';

import { ReactComponent as SunDark } from '../../icons/sunDark.svg';
import { ReactComponent as SunLight } from '../../icons/sunLight.svg';


const Container = styled.div<{ isTomorrow: boolean }>`
    ${({ isTomorrow }) => isTomorrow ?
    `
        width: 70px;
        height: 70px;
        opacity: 0.9;
    ` : `
        width: 100px;
        height: 100px;
        margin-bottom:20px;
    `}

    display:grid;
    place-content:center;

`

const Icon = ({
    darkMode,
    snow,
    rain,
    clouds,
    isTomorrow
}: {
    darkMode: boolean
    snow: number,
    rain: number,
    clouds: number,
    isTomorrow: boolean
}) => {

    const getDarkModeIcon = () => {
        const isHeavySonw = snow > 50 ? true : false;
        const isHeavyRain = rain > 50 ? true : false;
        const isSnow = snow > 0 ? true : false;
        const isRain = rain > 0 ? true : false;
        const isHeavyClouds = clouds > 60 ? true : false;
        const isClouds = clouds > 35 ? true : false;
        const isCloudsAndSun = clouds > 5 ? true : false;
        const isSun = clouds <= 5 ? true : false;

        if (isHeavySonw) return (<HeavySnowDark />)
        if (isHeavyRain) return (<HeavyRainDark />)
        if (isSnow) return (<SnowDark />)
        if (isRain) return (<RainDark />)
        if (isHeavyClouds) return (<HeavyCloundsDark />)
        if (isClouds) return (<CloudDark />)
        if (isCloudsAndSun) return (<SunCloundsDark />)
        if (isSun) return (<SunDark />)

        return ``
    }

    const getLightModeIcon = () => {
        const isHeavySonw = snow > 50 ? true : false;
        const isHeavyRain = rain > 50 ? true : false;
        const isSnow = snow > 0 ? true : false;
        const isRain = rain > 0 ? true : false;
        const isHeavyClouds = clouds > 60 ? true : false;
        const isClouds = clouds > 35 ? true : false;
        const isCloudsAndSun = clouds > 5 ? true : false;
        const isSun = clouds <= 5 ? true : false;

        if (isHeavySonw) return (<HeavySnowLight />)
        if (isHeavyRain) return (<HeavyRainLight />)
        if (isSnow) return (<SnowLight />)
        if (isRain) return (<RainLight />)
        if (isHeavyClouds) return (<HeavyCloundsLight />)
        if (isClouds) return (<CloudLight />)
        if (isCloudsAndSun) return (<SunCloundsLight />)
        if (isSun) return (<SunLight />)

        return ``
    }

    const getIcon = () => darkMode ? getDarkModeIcon() : getLightModeIcon()

    return (
        <Container isTomorrow={ isTomorrow}>
            {getIcon()}
            {/* <SunDark /> */}
        </Container>

    )
}

export default Icon