import React, { useState } from 'react';
import './App.scss';

import { Button } from 'semantic-ui-react';
import Person from './components/Person/index';

function App() {

  // Дефолтный массив пассажиров
  const [arrPeople, setArrPeople] = useState([
    { id: 1, snills: '', name: 'Jon', surname: 'Jonson', patronymic: '', dateBirth: '21.02.2000', sex: 'Мужской', citizenship: 'Россия', document: 'Паспорт', numDocument: '3121111111', ticket: false },
    { id: 2, snills: '', name: 'Jons', surname: 'Jonson', patronymic: '', dateBirth: '21.02.2000', sex: 'Мужской', citizenship: 'Россия', document: 'Паспорт', numDocument: '3121111111', ticket: false },
    { id: 3, snills: '', name: 'Jonh', surname: 'Jonson', patronymic: '', dateBirth: '21.02.2000', sex: 'Мужской', citizenship: 'Россия', document: 'Паспорт', numDocument: '3121111111', ticket: false },
  ]);

  // Создание нового объекта
  const createNewPerson = () => {
    let creacteId = arrPeople.length !== 0 ? arrPeople[arrPeople.length - 1].id : 0;

    let newObj = {
      id: creacteId + 1, snills: '', name: '', surname: '', patronymic: '', dateBirth: '', sex: '', citizenship: '', document: '', numDocument: '', ticket: false
    }
    return newObj
  };

  // Добавление нового пассажира
  const onClick = () => {
    setArrPeople([
      ...arrPeople, 
      createNewPerson()
    ])
  };

  // Удаление пассажира
  const deletedPerson = (id) => {
    setArrPeople(arrPeople.filter((elem) => elem.id !== id))
  };

  return (
    <div className="App">
      <div className="App-header">
        <Button 
          onClick={onClick}
          className="App-btn">Click Here</Button>
      </div>
        <div className="App-content">
          <Person
            massPeople={arrPeople} 
            delPerson={deletedPerson}
            />
        </div>
    </div>
  );
};

export default App;
