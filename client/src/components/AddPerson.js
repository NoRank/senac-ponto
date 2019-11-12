import React, { Component } from "react";
import { graphql } from "react-apollo";

import { AddPersonMutation, getPeopleQuery } from "../querries";

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      checkin: "",
      checkout: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.AddPersonMutation({
      variables: {
        name: this.state.name,
        age: this.state.age,
        checkin: this.state.checkin,
        checkout: this.state.checkout
      },
      refetchQueries: [{ query: getPeopleQuery }]
    });
  }

  render() {
    return (
      <div>
        <form id="add-person" onSubmit={this.submitForm.bind(this)}>
          <input
            type="text"
            placeholder="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="number"
            placeholder="age"
            onChange={e => this.setState({ age: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="checkin"
            onChange={e => this.setState({ checkin: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="checkout"
            onChange={e => this.setState({ checkout: e.target.value })}
          />
          <button>Add Person</button>
        </form>
      </div>
    );
  }
}

export default graphql(AddPersonMutation, { name: "AddPersonMutation" })(
  AddPerson
);
