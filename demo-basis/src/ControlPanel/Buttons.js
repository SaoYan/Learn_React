import React, { useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center
`;

const DynamicButton = styled.button`
    background-color: ${ (props) => props.alt};
    font: inherit;
    font-size: small;
    border: 1px solid white;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: "lightgray";
    }
`;

const Buttons = (props) => {
    useEffect(() => {
        console.log("[Buttons]");
    });

    let togglButtonText = "Show persons";
    if (props.showPersons) {
        togglButtonText = "Hide persons";
    }

    return (
        <Div>
            <DynamicButton
                onClick={props.togglePersonHandler}
                alt={props.showPersons ? "white" : "gray"}
            > 
                {togglButtonText}
            </DynamicButton>
            <button onClick={props.deletePersonHandler}>Delete one person</button>
            <button onClick={props.resetPersonHandler}>Reset persons</button>
        </Div>
    );
};

export default React.memo(Buttons);