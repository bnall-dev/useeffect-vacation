import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateVacation from './CreateVacation';
import Vacations from './Vacations';
import './App.css';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

const fetchVacations = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');

  const vacations = (await axios.get(`${API}/users/${userId}/vacations`)).data;
  return vacations;
};

function App() {
  let [user, setUser] = useState({});
  let [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetchUser().then(data => setUser(data));
    fetchVacations().then(data => setVacations(data));
  }, []);

  if (!user.id) {
    return '...Loading';
  }

  const createVacation = async vacation => {
    const response = await axios.post(
      `${API}/users/${user.id}/vacations`,
      vacation
    );
    setVacations([...vacations, response.data]);
  };

  const onSubmit = async e => {
    e.preventDefault();

    await createVacation({
      startDate: e.target.elements[0].value,
      endDate: e.target.elements[1].value,
    });
  };

  const destroyVacation = async vacationToDestroy => {
    await axios.delete(
      `${API}/users/${user.id}/vacations/${vacationToDestroy.id}`
    );
    setVacations(
      vacations.filter(vacation => vacation.id !== vacationToDestroy.id)
    );
  };
  console.log(user);
  return (
    <div id="app">
      <header>
        Vacation Planner for <h2>{user.fullName}</h2>
      </header>
      <CreateVacation createVacation={createVacation} onSubmit={onSubmit} />
      <div id="vacations">
        <h3>Scheduled Vacations ({vacations.length})</h3>
        <div id="vacationDiv">
          <Vacations vacations={vacations} destroyVacation={destroyVacation} />
        </div>
      </div>
    </div>
  );
}

export default App;
