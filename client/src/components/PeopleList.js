import React, { useState } from "react";
import { graphql, useSubscription, useQuery } from "react-apollo";
import { getPeopleQuery, PersonSubscription } from "../querries";

import PersonInfo from "./PersonInfo";

const PeopleList = () => {
  const [selected, setSelected] = useState(null);
  const { loading, data } = useQuery(getPeopleQuery);
  const { data: dataSubs } = useSubscription(PersonSubscription);

  console.log(dataSubs);

  return (
    <div id="people-list">
      <h1>Lista de funcionarios e horarios</h1>
      <ul>
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          data.people.map(person => (
            <li
              key={person.id}
              onClick={e => {
                setSelected(person.id);
              }}
            >
              {person.name}
            </li>
          ))
        )}
      </ul>
      <PersonInfo personId={selected} />
    </div>
  );
};

export default PeopleList;
