import React, { Component } from "react";
import "./App.css";

import ControlPanel from "./ControlPanel";
import Persons from "./Persons";

const DEFAULT_PERSONS = [
    {id: "330", name: "Harry", age: "20"},
    {id: "287", name: "Tom", age: "24"},
    {id: "031", name: "Jim", age: "27"},
    {id: "029", name: "Mary", age: "19"}
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [...DEFAULT_PERSONS],
            showPersons: true,
            personToAdd: {
                id: "",
                name: "",
                age: ""
            }
        };
    }

    addPersonHandler = () => {
        this.setState((prevState) => {
            const personToAdd = prevState.personToAdd;

            if (personToAdd.id === "" ||
                personToAdd.name === "" ||
                personToAdd.age === "") {
                return;
            }

            if (personToAdd.age < 0) {
                alert("Age cannot be negative!");
                return;
            }

            const newPersons = [...prevState.persons, personToAdd];

            return {
                persons: newPersons,
                personToAdd: {
                    id: "",
                    name: "",
                    age: ""
                }
            };
        });
    };

    changeNameHandler = (event, id) => {
        const newName = event.target.value;

        this.setState((prevState) => {
            const personToChangeIndex = prevState.persons.findIndex((person) => {
                return person.id === id;
            });
            const newPerson = {
                ...prevState.persons[personToChangeIndex],
                name: newName
            };

            const newPersons = [...prevState.persons];
            newPersons[personToChangeIndex] = newPerson;

            return {
                persons: newPersons
            };
        });
    };

    deletePersonHandler = (index) => {
        this.setState((prevState) => {
            const persons = [...prevState.persons];
            persons.splice(index, 1);

            return {
                persons: persons
            };
        });
    };

    resetPersonHandler = () => {
        this.setState({
            persons: [...DEFAULT_PERSONS]
        });
    };

    togglePersonHandler = () => {
        this.setState((prevState) => {
            return {
                showPersons: !prevState.showPersons
            };
        });
    };

    typeIdHandler = (event) => {
        const id = event.target.value;

        this.setState((prevState) => {
            const newPerson = {
                ...prevState.personToAdd,
                id: id
            };

            return {
                personToAdd: newPerson
            };
        });
    }

    typeNameHandler = (event) => {
        const name = event.target.value;

        this.setState((prevState) => {
            const newPerson = {
                ...prevState.personToAdd,
                name: name
            };

            return {
                personToAdd: newPerson
            };
        });
    }

    typeAgeHandler = (event) => {
        const age = event.target.value;

        this.setState((prevState) => {
            const newPerson = {
                ...prevState.personToAdd,
                age: age
            };

            return {
                personToAdd: newPerson
            };
        });
    }

    render() {
        return (
            <div className="App">
                <h1>{this.props.title}</h1>
                <ControlPanel
                    togglePersonHandler={this.togglePersonHandler}
                    deletePersonHandler={() => this.deletePersonHandler(0)}
                    resetPersonHandler={this.resetPersonHandler}
                    showPersons={this.state.showPersons}

                    id={this.state.personToAdd.id}
                    name={this.state.personToAdd.name}
                    age={this.state.personToAdd.age}
                    typeIdHandler={this.typeIdHandler}
                    typeNameHandler={this.typeNameHandler}
                    typeAgeHandler={this.typeAgeHandler}
                    addPersonHandler={this.addPersonHandler}
                />
                { this.state.showPersons ?
                    <Persons
                        persons={this.state.persons}
                        changeNameHandler={this.changeNameHandler}
                    /> : null
                }
            </div>
        );
    }
}

export default App;