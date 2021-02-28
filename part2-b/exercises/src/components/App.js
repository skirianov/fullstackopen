import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1},
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4}
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filtered, setFiltered ] = useState(persons);

  const handleNewPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
        alert(`${newName} already exists in the phonebook`);
        setNewName('');
        setNewPhone('');
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1,
        }
      setPersons(persons.concat(newPerson));
      setFiltered(filtered.concat(newPerson));
      setNewName('');
      setNewPhone('');
    }
  }
  

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  }

  const filterList = (event) => {
    const filter = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFiltered(filter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterList={filterList} />
      <h2>add new</h2>
      <PersonForm handleNewName={handleNewName} handlePhone={handlePhone} newName={newName} newPhone={newPhone} handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      <Persons filtered={filtered} />
    </div>
  )
}

export default App