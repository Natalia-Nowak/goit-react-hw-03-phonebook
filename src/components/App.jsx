import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    const contactsJSON = localStorage.getItem('contacts');
    if (contactsJSON === null) {
      this.state = {
        contacts: [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
        name: '',
        number: '',
      };
    } else {
      const contacts = JSON.parse(contactsJSON);
      this.state = {
        contacts: contacts,
        filter: '',
        name: '',
        number: '',
      };
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    for (const contact of this.state.contacts) {
      if (this.state.name === contact.name) {
        alert(contact.name + ' is already in contacts.');
        return;
      }
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    const contacts = [...this.state.contacts, newContact];
    localStorage.setItem('contacts', JSON.stringify(contacts));

    this.setState(previousState => ({
      contacts: [...previousState.contacts, newContact],
    }));
  };

  handleChangeName = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeNumber = event => {
    this.setState({
      number: event.target.value,
    });
  };

  handleChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
    console.log('a');
  };

  handleDelete = name => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.name !== name
    );
    console.log(filteredContacts);
    console.log(name);
    this.setState({ contacts: filteredContacts });
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  };

  render() {
    const { name } = this.state;
    const { contacts } = this.state;
    const { number } = this.state;
    const { filter } = this.state;
    return (
      <div className="wrapper">
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          changeName={this.handleChangeName}
          changeNumber={this.handleChangeNumber}
          handleSubmit={this.handleSubmit}
        />

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          contacts={contacts}
          changeFilter={this.handleChangeFilter}
        />
        <ContactList
          filter={filter}
          contactList={contacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
