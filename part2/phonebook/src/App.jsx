import { useState, useEffect } from "react";
import axios from "axios";
import personsService from "./services/persons";

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.name} onChange={props.onChange} />
    </div>
  );
};
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((intitialPersons) => {
      setPersons(intitialPersons);
    });
  }, []);

  const deleteHandle = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    let flag = false;
    persons.forEach((person, index, array) => {
      if (person.name === newName) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          const changedPerson = { ...person, number: newNumber };
          personsService
            .update(person.id, changedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((p) => (p.id === person.id ? returnedPerson : p))
              );
              setMessage(`Updated number for ${returnedPerson.name}`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setMessage(
                `Information of ${person.name} was already removed from the server`
              );
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            });

          flag = true;
        }
      }
    });
    if (flag == false) {
      const nameObj = {
        name: newName,
        number: newNumber,
      };
      personsService.create(nameObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter name={filterName} onChange={handleFilterNameChange} />
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} - {person.number}
              <button onClick={() => deleteHandle(person.id, person.name)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
