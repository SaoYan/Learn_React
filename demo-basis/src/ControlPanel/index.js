import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";

import AddPerson from "./AddPerson";
import Buttons from "./Buttons";

const ControlPanel = (props) => {
    useEffect(() => {
        console.log("[ControlPanel] useEffect");
    });

    return (
        <Fragment>
            <Buttons
                showPersons={props.showPersons}
                togglePersonHandler={props.togglePersonHandler}
                deletePersonHandler={props.deletePersonHandler}
                resetPersonHandler={props.resetPersonHandler}
            />
            <AddPerson
                id={props.id}
                name={props.name}
                age={props.age}
                typeIdHandler={props.typeIdHandler}
                typeNameHandler={props.typeNameHandler}
                typeAgeHandler={props.typeAgeHandler}
                addPersonHandler={props.addPersonHandler}
            />
        </Fragment>
    );
};

ControlPanel.propTypes = {
    showPersons: PropTypes.bool,
    togglePersonHandler: PropTypes.func,
    deletePersonHandler: PropTypes.func,
    resetPersonHandler: PropTypes.func,

    id: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.string,
    typeIdHandler: PropTypes.func,
    typeNameHandler: PropTypes.func,
    typeAgeHandler: PropTypes.func,
    addPersonHandler: PropTypes.func
};

export default React.memo(ControlPanel);