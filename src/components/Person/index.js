import React, { useState } from 'react';
import './style.scss';

import PersonItem from '../PersonItem/index';
import FormPerson from '../FormPerson/index';
import MyModal from '../MyModal/index';

const Person = (props) => {

    // Видимость формы
    const [visibleForm, setVisibleForm] = useState(false);
    // Данные о пассажире
    const [data, setData] = useState('');

    // Открыть форму
    const setOpenForm = (data) => {
        setData(data);
        setVisibleForm(true);
    };

    const items = 
        props.massPeople ? 
            props.massPeople.map((elem, index) => {
                return (
                    <li key={index} className="person-menu__item">
                        <PersonItem
                            numPerson={index + 1}
                            delPerson={props.delPerson}
                            id={elem.id}
                            setOpen={() => setOpenForm(elem)} />
                    </li>
                )
            }) 
            : <p className="person-menu__error">Ошибка отображения</p>
    
    return (
        <div>
            <ul className="person-menu">
                {items}
            </ul>
            
            <MyModal
                open={visibleForm}>
                <FormPerson
                    dataPerson={data}
                    deletedPerson={props.delPerson}
                    closeForm={() => setVisibleForm(false)} />
            </MyModal>
        </div>
    );
};

export default Person;