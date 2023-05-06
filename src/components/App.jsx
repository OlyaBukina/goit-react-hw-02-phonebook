import { Component } from 'react';
import { customAlphabet } from 'nanoid';

import { GlobalStyle } from './GlobalStyle';
import { Container } from './Container/Container.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';

const nanoid = customAlphabet('1234567890', 4);

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onFormSubmit = values => {
    let isExist = false;

    this.state.contacts.forEach(({ name }) => {
      if (name.toLowerCase() === values.name.toLowerCase()) {
        alert(`${values.name} is already in contacts.`);
        isExist = true;
      }
    });
    if (!isExist) {
      this.addContact(values);
    }
  };
  addContact = values => {
    const contact = { id: nanoid(), ...values };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filtedContacts = this.getFilterContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        {filtedContacts.length ? (
          <ContactList
            contacts={filtedContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <Notification message="There are no contacts" />
        )}

        <GlobalStyle />
      </Container>
    );
  }
}
