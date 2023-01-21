// import { Component } from 'react';
// // import { Profile } from './Profile/Profile';
// // import { Statistics } from './Statistics/Statistics';
// // import { FriendList } from './FriendList/FriendList';
// // import { TransactionHistory } from './TransactionHistory/TransactionHistory';
// // import { Counter } from './Counter/Counter';
// // import { Dropdown } from './Dropdown/Dropdown';
// import TodoList from './TodoList';

// // import user from './dataBase/user.json';
// // import data from './dataBase/data.json';
// // import friends from './dataBase/friends.json';
// // import transactions from './dataBase/transactions.json';
// import initialTodo from './dataBase/todos.json';

// export class App extends Component {
//   state = {
//     todos: initialTodo,
//   };

//   deleteTodo = todoId => {
//     this.setState(prevState => ({
//       todos: prevState.todos.filter(todo => todo.id !== todoId),
//     }));
//   };

//   render() {
//     const { todos } = this.state;
//     const completedTodos = todos.reduce(
//       (acc, todo) => (todo.completed ? acc + 1 : acc),
//       0
//     );

//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '40px',
//           color: '#010101',
//         }}
//       >
//         <p>Todos quantity: {todos.length}</p>
//         <p>Todos finished: {completedTodos}</p>
//         <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
//         {/* <Counter initialValue={0} /> */}
//         {/* {<Dropdown />} */}
//         {/* <Profile
//         username={user.username}
//         tag={user.tag}
//         location={user.location}
//         avatar={user.avatar}
//         stats={user.stats}
//       />
//       <Statistics title="Upload stats" stats={data} />
//       <FriendList friends={friends} />
//       <TransactionHistory items={transactions} /> */}
//       </div>
//     );
//   }
// }
import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Modal from './Modal';
import PropTypes from 'prop-types';

// Nanoid---------------------------------------
import { nanoid } from 'nanoid';
export class App extends Component {
  static defaultProps = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired
    ),
    filter: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
  };

  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  // componentDidMount() нужен для того что бы взять начальные значения с бекенда (fetch) и по ним сделать setState(), вызывается один раз
  //Проверка (parsedContacts !== null) обязательна, что бы не упало приложение.
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // componentDidUpdate(prevProps, prevState) вызывается при каждом обновлении состояния или пропсов, нужен что бы записать,
  // что то в localStorage или сделать новый запрос на сервер с другими параметрами
  //(prevState.--- !== this.state.---) проверка обязательна, что бы не зациклить приложение, как при бесконечных циклах

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = values => {
    values.id = nanoid();
    if (this.checkContacts(this.state.contacts, values)) {
      return alert(`${values.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [values, ...prevState.contacts],
    }));
  };

  checkContacts = (contacts, values) => {
    return contacts.find(contact => contact.name === values.name.trim());
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { filter, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex-start',
          padding: '40px',
          flexDirection: 'column',
          gap: '40px',
          color: '#ffffff',
        }}
      >
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            onDeleteContact={this.deleteContact}
            contacts={visibleContacts}
          />
        </div>
        <button type="button" onClick={this.toggleModal}>
          open
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>Modal is here</p>
            <button type="button" onClick={this.toggleModal}>
              close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

// FeedBack

// import { Component } from 'react';
// import Section from './Section';
// import FeedbackOptions from './FeedbackOptions';
// import Statistics from './Statistics';
// import Notification from './Notification';
// import PropTypes from 'prop-types';
// export class App extends Component {
//   static defaultProps = {
//     state: PropTypes.shape({
//       good: PropTypes.number.isRequired,
//       neutral: PropTypes.number.isRequired,
//       bad: PropTypes.number.isRequired,
//     }).isRequired,
//   };

//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = option => {
//     this.setState({ [option]: this.state[option] + 1 });
//   };

//   countTotalFeedback = () =>
//     Object.values(this.state).reduce((value, acc) => (acc += value), 0);

//   countPositiveFeedbackPercentage = ({ good } = this.state) => {
//     return Math.round((good * 100) / this.countTotalFeedback() || 0);
//   };

//   render() {
//     const options = Object.keys(this.state);
//     const { good, neutral, bad } = this.state;

//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex-start',
//           padding: '40px',
//           flexDirection: 'column',
//           gap: '40px',
//           color: '#010101',
//         }}
//       >
//         <Section title={'Please leave feedback'}>
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>

//         {!this.countTotalFeedback() ? (
//           <Notification message="There is no feedback"></Notification>
//         ) : (
//           <Section title={'Statistics'}>
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         )}
//       </div>
//     );
//   }
// }
