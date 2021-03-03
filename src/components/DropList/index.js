import React, { useState, useRef } from 'react';
import './style.scss';

const DropList = (props) => {

    // Состоние меню
    const [listVisible, setList] = useState(false);
    // Определение клика вне меню
    const listClickRef = useRef(null);

    // Клик был вне меню?
    document.addEventListener('click', (e) => {
        if (listClickRef.current && !listClickRef.current.contains(e.target)) {
            setList(false);
        } else return;
    });

    // Отправление данных и закрытие меню
    const setSendEndClose = (name, value) => {
        if (props.onChange) {
            props.onChange(name, value);
            setList(false);
        } else return;
    };

    return (
        <div className="form-person-content__input" ref={listClickRef}> 
            <input 
                type="text"
                className="drop-list"
                placeholder={props.placeholder ? props.placeholder : ''}
                value={props.value}
                readOnly />
            <i 
                className="fas fa-chevron-down drop"
                onClick={() => setList(!listVisible)}>
            </i>
            {listVisible === true ?
                <div className="drop-list__content">
                    {props.options ?
                        props.options.map((item, index) => {
                            return (
                                <span 
                                    key={index}
                                    className="drop-list__item"
                                    onClick={() => setSendEndClose(props.name, item.text)}>
                                        {item.text}
                                </span>
                            );
                        })
                    :
                        <span 
                            className="drop-list__item"
                            onClick={() => setSendEndClose(props.name, 'Пусто')}>
                                Пусто
                        </span> }
            </div> : null}
        </div>  
    );
};

export default DropList;