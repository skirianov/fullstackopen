import React from 'react';

const Persons = ({ person, deleteEntry }) => (
    <div key={person.id}>
      <p>{person.name}: {person.number}</p>
      <button value="delete" onClick={deleteEntry}>delete</button>
    </div>
);

export default Persons;