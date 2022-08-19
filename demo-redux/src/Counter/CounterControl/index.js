import React from "react";

import "./CounterControl.css";

const CounterControl = (props) => (
    <div className="counterControl" onClick={props.clicked}>
        {props.label}
    </div>
);

export default CounterControl;