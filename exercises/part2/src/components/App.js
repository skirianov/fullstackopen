import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import phoneService from '../services/phonebook';
import Notification from './Notification';

const App = () => {
  const [ persons, setPersons ] = useState([ ]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filtered, setFiltered ] = useState(persons);
  const [ message, setMessage ] = useState(null);
  const [ status, setStatus ] = useState(200);

  useEffect(() => {
    phoneService 
      .get()
      .then( phonebook => {
        setPersons(phonebook);
        setFiltered(phonebook);
      })
  }, [])

  const handleNewPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
      const person = persons.find(person => person.name === newName);
      console.log(person);
        if (window.confirm(`The ${person.name} alredy exists in the phonebook. Do you want to update number?`)) {
          const newPerson = {
            name: person.name,
            number: newPhone,
            id: person.id,
            }
          phoneService
            .update(person.id, newPerson)
            .then( updatedPhone => {
              setPersons(persons.map( person => person.id !== updatedPhone.id ? person : updatedPhone ));
              setFiltered(persons.map( person => person.id !== updatedPhone.id ? person : updatedPhone ));
            })
            .catch (error => {
              setMessage(`Information of ${newPerson.name} has already been removed from the server. Refreshing phonebook...`);
              setStatus(404);
                phoneService 
                .get()
                .then( phonebook => {
                  setPersons(phonebook);
                  setFiltered(phonebook);
                })
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });

          setNewName('');
          setNewPhone('');
        }
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
        id: persons[persons.length -1].id + 1,
        }
        phoneService.create(newPerson)
          .then( created => {
            setPersons(persons.concat(created));
            setFiltered(filtered.concat(created));
            setNewName('');
            setNewPhone('');
          })
      setMessage(`Added ${newPerson.name}`);
      setStatus(200);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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

  const deleteEntry = (id) => {
    const person = persons.filter( person => person.id === id )[0];
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      phoneService.deletePerson(id);
      setPersons(persons.filter( person => person.id !== id));
      setFiltered(persons.filter( person => person.id !== id));
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status}/>
      <Filter filterList={filterList} />
      <h2>add new</h2>
      <PersonForm handleNewName={handleNewName} handlePhone={handlePhone} newName={newName} newPhone={newPhone} handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      <div>
        {filtered.map(person => 
          <Persons person={person} key={person.id} deleteEntry={() => deleteEntry(person.id)} />
          )}
      </div>
    </div>
  )
}

export default App