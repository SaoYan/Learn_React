import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "./CounterControl";
import CounterOutput from "./CounterOutput";

import {
    add,
    decrement,
    increment,
    sub,

    addResult,
    deleteResult
} from "../redux/actions";

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl
                    label="Increment"
                    clicked={this.props.increment}
                />
                <CounterControl
                    label="Decrement"
                    clicked={this.props.decrement}
                />
                <CounterControl
                    label="Add 5"
                    clicked={() => this.props.add(5)}
                />
                <CounterControl
                    label="Subtract 5"
                    clicked={() => this.props.sub(5)}
                />
                <hr />
                <button
                    onClick={() => this.props.addResult(this.props.counter)}
                >
                    Store Result
                </button>
                <ul>
                    {
                        this.props.results.map((result) => {
                            return (
                                <li
                                    key={result.id}
                                    onClick={() => this.props.deleteResult(result.id)}
                                >
                                    {result.value}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        results: state.results
    };
};

const mapDispatchToProps = {
    add,
    decrement,
    increment,
    sub,

    addResult,
    deleteResult
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);