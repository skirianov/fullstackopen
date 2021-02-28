import React from 'react';

const Persons = ({ filtered }) => (
    <div>
        {filtered.map(person => <p key={person.id}>{person.name}: {person.phone}</p>)}
      </div>
);

export default Persons;