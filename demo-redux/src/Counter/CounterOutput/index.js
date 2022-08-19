import React from "react";

import "./CounterOutput.css";

const CounterOutput = (props) => (
    <div className="counterOutput">
        Current Counter: {props.value}
    </div>
);

export default CounterOutput;