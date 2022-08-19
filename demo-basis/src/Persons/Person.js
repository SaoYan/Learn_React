import React from "react";
import PropTypes from "prop-types";

const Person = (props) => {
    return (
        <div className="block">
            <p>id: {props.id}</p>
            <p>name: {props.name}</p>
            <p>age: {props.age}</p>
            <input
                type="text"
                onChange={props.changeNameHandler}
                value={props.name}
            />
        </div>
    );
};

Person.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.string,
    changeNameHandler: PropTypes.func
};

export default Person;