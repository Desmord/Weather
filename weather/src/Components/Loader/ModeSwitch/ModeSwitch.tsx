import styled from "styled-components";
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';

const Container = styled.div`
    position: fixed;
    top:20px;
    right: 20px;
    width: 50px;
    height: 50px;
    display:grid;
    place-content:center;
`

const ModeIcon = styled.div<{ isDisplay: boolean }>`
    width: 100%;
    height: 100%;
    font-size: 35px;


    ${({ isDisplay }) => isDisplay ?
        `
        display:none;
        color:black;
        ` : `
        display:gird;
        place-content:center;
        `}

    &:hover{
        cursor:pointer;
    }
`

const ModeSwitch = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: Function }) => {

    return (
        <Container  >
            <ModeIcon
                isDisplay={darkMode}
                onClick={() => setDarkMode((prev: boolean) => !prev)}>
                <BsLightbulbFill />
            </ModeIcon>
            <ModeIcon
                isDisplay={!darkMode}
                onClick={() => setDarkMode((prev: boolean) => !prev)}>
                < BsLightbulb />
            </ModeIcon>
        </Container >
    )
}

export default ModeSwitch