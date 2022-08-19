import React, { useEffect, useRef } from "react";

const AddPerson = (props) => {
    const inputIdElement = useRef();
    
    useEffect(() => {
        inputIdElement.current.focus();
    }, []);

    useEffect(() => {
        console.log("[AddPerson]");
    });

    return (
        <div className="block">
            <input
                type="text"
                placeholder="id"
                onChange={props.typeIdHandler}
                value={props.id}
                ref={inputIdElement}
            />
            <input
                type="text"
                placeholder="name"
                onChange={props.typeNameHandler}
                value={props.name}
            />
            <input
                type="number"
                placeholder="age"
                onChange={props.typeAgeHandler}
                value={props.age}
            />
            <button onClick={props.addPersonHandler}>Add Person</button>
        </div>
    );
};

export default React.memo(AddPerson);