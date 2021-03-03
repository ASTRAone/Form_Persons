import React from 'react';
import './style.scss';

const PersonItem = ({ numPerson, delPerson, id, setOpen }) => {
    return (
        <div className="person-item">
            <div 
                className="person-item__content"
                onClick={setOpen ? setOpen : null} >
                <p 
                    className="person-item__text">
                        Пассажир № {numPerson ? numPerson : 'Ошибка отображения'}
                </p>
            </div>
            <i 
                onClick={() => delPerson(id)}
                className="fas fa-user-times circle">
            </i>
        </div>
    );
};

export default PersonItem;