import React from "react";
import PropTypes from "prop-types";

import Person from "./Person";

const Persons = (props) => {
    return (
        <div className="blockList">
            {props.persons.map((person) => {
                return (
                    <Person
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        age={person.age}
                        changeNameHandler={(event) => props.changeNameHandler(event, person.id)}
                    />
                );
            })}
        </div>
    );
};

Persons.propTypes = {
    persons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            age: PropTypes.string
        })
    ),
    changeNameHandler: PropTypes.func
};

export default React.memo(Persons);