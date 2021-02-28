import React from 'react';

const PersonForm = ({ handleNewPerson, newName, handleNewName, newPhone, handlePhone }) => (
    <form  onSubmit={handleNewPerson}>
        <div>
          name: <input required value={newName} onChange={handleNewName}/>
          phone: <input required value={newPhone} onChange={handlePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm;