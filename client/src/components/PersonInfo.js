import React, { Component } from "react";
import { graphql } from "react-apollo";

import { getPersonQuery } from "../querries";

class PersonInfo extends Component {
  showPersonInfo() {
    const { person } = this.props.data;
    if (person) {
      return (
        <div>
          <h2>{person.name}</h2>
          <p>#{person.id}</p>
          <div className="holder">
            <h3>Age:</h3>
            <p>{person.age}</p>
          </div>
          <div className="holder">
            <h3>Checkin time:</h3>
            <p>{person.checkin}</p>
          </div>
          <div className="holder">
            <h3>Checkout time:</h3>
            <p>{person.checkout}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>No person selected</h2>
        </div>
      );
    }
  }
  render() {
    return <div id="person-info">{this.showPersonInfo()}</div>;
  }
}

export default graphql(getPersonQuery, {
  options: props => {
    return {
      variables: {
        id: props.personId
      }
    };
  }
})(PersonInfo);
