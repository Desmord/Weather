import { useState, useEffect } from "react";
import styled from "styled-components";
import useShowHide from "../../CustomHooks/useShowHide";

const Container = styled.div<{ isDisplay: boolean, isShown: boolean }>`
    position:relative;
    grid-column:2/4;
    grid-row:4/5;
    display:none;
    opacity: 0;
    font-size: 1rem;
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
    ` : `
        display:none;
    `}
`

const DateText = styled.div`
    padding-left: 20px;
    padding-right: 20px;
`

const Dates = ({
    displayWeather,
}: {
    displayWeather: boolean,
}) => {
    const { isDisplay, isShown, } = useShowHide(displayWeather);
    const [currentDate] = useState(new Date());
    const [tomorrowDate] = useState(() => {
        let tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1)
        return tommorow
    });

    return (
        <Container isDisplay={isDisplay} isShown={isShown} >
            <DateText>
                {`${String(currentDate.getDate()).length > 1 ? currentDate.getDate() : `0${currentDate.getDate()}`}
                -${String(currentDate.getMonth() + 1).length > 1 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`}
                -${currentDate.getFullYear()}`}
            </DateText>
            <DateText>
                {`${String(tomorrowDate.getDate()).length > 1 ? tomorrowDate.getDate() : `0${tomorrowDate.getDate()}`}
                -${String(tomorrowDate.getMonth() + 1).length > 1 ? tomorrowDate.getMonth() + 1 : `0${tomorrowDate.getMonth() + 1}`}
                -${tomorrowDate.getFullYear()}`}
            </DateText>
        </Container>

    )
}

export default Dates