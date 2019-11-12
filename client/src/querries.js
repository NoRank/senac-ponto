import { gql } from "apollo-boost";

const getPersonQuery = gql`
  query($id: ID) {
    person(id: $id) {
      id
      name
      age
      checkin
      checkout
    }
  }
`;

const getPeopleQuery = gql`
  {
    people {
      id
      name
      age
      checkin
      checkout
    }
  }
`;

const AddPersonMutation = gql`
  mutation($name: String!, $age: Int!, $checkin: String!, $checkout: String!) {
    addPerson(name: $name, age: $age, checkin: $checkin, checkout: $checkout) {
      id
      name
      age
      checkin
      checkout
    }
  }
`;

const PersonSubscription = gql`
  subscription($someThing: String!) {
    addPerson(someThing: $someThing) {
      id
      name
      age
      checkin
      checkout
    }
  }
`;

export {
  getPeopleQuery,
  getPersonQuery,
  AddPersonMutation,
  PersonSubscription
};
