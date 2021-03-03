import React, { useState } from 'react'
import './style.scss';

import { Input, Button } from 'semantic-ui-react';
import DropList from '../DropList/index';
import { selectSexPerson, selectCitizenship, typeDocument } from '../../defaultData';

const FormPerson = (props) => {

    const [data, setData] = useState(
        {
            id: props.dataPerson.id ? props.dataPerson.id : '',
            fcc: props.dataPerson.ticket ? props.dataPerson.ticket : false,
            snills: props.dataPerson.snills ? props.dataPerson.snills : '',
            name: props.dataPerson.name ? props.dataPerson.name : '',
            lastName: props.dataPerson.surname ? props.dataPerson.surname : '',
            patronymic: props.dataPerson.patronymic ? props.dataPerson.patronymic : '',
            sex: props.dataPerson.sex ? props.dataPerson.sex : '',
            birthDay: props.dataPerson.dateBirth ? props.dataPerson.dateBirth : '',
            citizenship: props.dataPerson.citizenship ? props.dataPerson.citizenship : '',
            documentType: props.dataPerson.document ? props.dataPerson.document : '',
            documentNum: props.dataPerson.numDocument ? props.dataPerson.numDocument : '',
            rate: props.dataPerson.rate ? props.dataPerson.rate : ''
        }
    );

    // Флаги на заполненные данные
    const [errName, setErrName] = useState(true);
    const [errLastName, setErrLastName] = useState(true);
    const [errPatronymic, setErrPatronymic] = useState(true);
    const [errSex, setErrSex] = useState(true);
    const [errBirthDay, setErrBirthDay] = useState(true);
    const [errCitizenship, setErrCitizenship] = useState(true);
    const [errDocumentType, setErrDocumentType] = useState(true);
    const [errDocumentNum, setErrDocumentNum] = useState(true);

    // Флаг на проверку отправки данных
    const [errData, setErrData] = useState(true);

    // Проверка данных
    const checkData = (name, value) => {
        switch(name) {
            case 'name' : 
                if (value.length === 0) {
                    setErrName(false);
                    return false;
                } else {
                    setErrName(true);
                    return true;
                }
            
            case 'lastName' : 
                if (value.length === 0) {
                    setErrLastName(false);
                    return false;
                } else {
                    setErrLastName(true);
                    return true;
                }

            case 'patronymic' : 
                if (value.length === 0) {
                    setErrPatronymic(false);
                    return false;
                } else {
                    setErrPatronymic(true);
                    return true;
                }
            
            case 'sex' : 
                if (value.length === 0) {
                    setErrSex(false);
                    return false;
                } else {
                    setErrSex(true);
                    return true;
                }

            case 'birthDay' : 
                if (value.length === 0) {
                    setErrBirthDay(false);
                    return false;
                } else {
                    setErrBirthDay(true);
                    return true;
                }

            case 'citizenship' : 
                if (value.length === 0) {
                    setErrCitizenship(false);
                    return false;
                } else {
                    setErrCitizenship(true);
                    return true;
                }

            case 'documentType' : 
                if (value.length === 0) {
                    setErrDocumentType(false);
                    return false;
                } else {
                    setErrDocumentType(true);
                    return true;
                }

            case 'documentNum' : 
                if (value.length === 0) {
                    setErrDocumentNum(false);
                    return false;
                } else {
                    setErrDocumentNum(true);
                    return true;
                }
        }
    }

    // Изменить данные
    const setEditData = (name, value) => {
        checkData(name, value);

        console.log(checkData(name, value));
        let newObj = {...data};
        newObj[name] = value;

        return newObj;
    };

    // Изменить массив
    const editDataPersons = (name, value) => {
        setData(setEditData(name, value));
    };

    // Удалить пассажира
    const deletedPerson = () => {
        if (props.deletedPerson && props.closeForm) {
            props.deletedPerson(data.id);
            props.closeForm();
        }
        return;
    };

    // Выход
    const setClosedCard = (e) => {
        e.preventDefault();

        setData({
            id: props.dataPerson.id ? props.dataPerson.id : '',
            fcc: props.dataPerson.ticket ? props.dataPerson.ticket : false,
            snills: props.dataPerson.snills ? props.dataPerson.snills : '',
            name: props.dataPerson.name ? props.dataPerson.name : '',
            lastName: props.dataPerson.surname ? props.dataPerson.surname : '',
            patronymic: props.dataPerson.patronymic ? props.dataPerson.patronymic : '',
            sex: props.dataPerson.sex ? props.dataPerson.sex : '',
            birthDay: props.dataPerson.dateBirth ? props.dataPerson.dateBirth : '',
            citizenship: props.dataPerson.citizenship ? props.dataPerson.citizenship : '',
            documentType: props.dataPerson.document ? props.dataPerson.document : '',
            documentNum: props.dataPerson.numDocument ? props.dataPerson.numDocument : ''
        });

        props.closeForm();
    };

    // Сохранить
    const setSavePerson = (e) => {   
        e.preventDefault();

        if (data.name.length > 0 && data.lastName.length > 0 && data.patronymic.length > 0 && 
            data.sex.length > 0 && data.birthDay.length > 0 && data.citizenship.length > 0 && 
            data.documentType.length > 0 && data.documentNum.length > 0) {
                fetch('https://webhook.site/d9114a4e-ca88-45b4-ac6d-a66c95e04ac0', {
                    method: 'POST',
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((ex) => console.log("parsing failed", ex));
                
                setErrData(true);
                props.closeForm();
            } else {
                setErrData(false);
            }
    };

    return (
        <form className="form-person">
            <header className="form-person-header">
                <div className="form-person-header__our">
                    <h2 className="form-person-header__title">
                        Пассажир №1
                    </h2>
                    <div 
                        className="form-person-header__del"
                        onClick={deletedPerson} >
                        <i className="fas fa-minus-square form-person-header__trash"></i>
                        <p className="form-person-header__text">
                            Удалить пассажира
                        </p>
                    </div>
                </div>
                <div className="form-person-header__ticket">
                    <Input 
                        id="fcc" 
                        type="checkbox" 
                        className="form-person-header__checkbox"
                        value={data.fcc}
                        onChange={(e) => editDataPersons('fcc', e.target.checked)} />
                    <label className="form-person-header__label" form="fcc">Оформление билета по ФСС</label>
                </div>
            </header>
            <section className="form-person-content">
                <div className="form-person-content__item-first">
                    <label className="form-person-content__label dotter-black">Снилс или номер регистрации ЦСМ</label>
                    <Input 
                        className="form-person-content__input"
                        value={data.snills}
                        onChange={(e) => editDataPersons('snills', e.target.value)} />
                </div>
                <div className="form-person-content__our">
                    <div className="form-person-content__item">
                        <label className="form-person-content__label">Фамилия</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <Input 
                            className="form-person-content__input"
                            value={data.lastName}
                            onChange={(e) => editDataPersons('lastName', e.target.value)} />
                        {errLastName === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label">Имя</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <Input 
                            className="form-person-content__input"
                            value={data.name}
                            onChange={(e) => editDataPersons('name', e.target.value)} />
                        {errName === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label dotter-black">Отчество (обязательно, при наличии)</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <Input 
                            className="form-person-content__input"
                            value={data.patronymic}
                            onChange={(e) => editDataPersons('patronymic', e.target.value)} />
                        {errPatronymic === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label">Пол</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <DropList
                            className="form-person-content__input"
                            placeholder="Не выбрано"
                            options={selectSexPerson}
                            value={data.sex}
                            name="sex"
                            onChange={(name, value) => editDataPersons(name, value)} />
                        {errSex === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label">Дата рождения</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <Input 
                            className="form-person-content__input"
                            value={data.birthDay}
                            onChange={(e) => editDataPersons('birthDay', e.target.value)}  />
                        {errBirthDay === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label dotter-black">Гражданство</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <DropList 
                            className="form-person-content__input"
                            placeholder="Не выбрано"
                            options={selectCitizenship}
                            value={data.citizenship}
                            name="citizenship"
                            onChange={(name, value) => editDataPersons(name, value)} 
                            />
                        {errCitizenship === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label dotter-black">Тип документа</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <DropList 
                            className="form-person-content__input"
                            clearable
                            placeholder="Не выбрано"
                            options={typeDocument}
                            value={data.documentType}
                            name="documentType"
                            onChange={(name, value) => editDataPersons(name, value)}  
                            />
                        {errDocumentType === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label dotter-black">Номер документа</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <Input 
                            className="form-person-content__input"
                            value={data.documentNum}
                            onChange={(e) => editDataPersons('documentNum', e.target.value)}  />
                        {errDocumentNum === false ?
                            <p className="form-person-content__err">Поле обязательное </p>
                        : null}
                    </div>
                    <div className="form-person-content__item">
                        <label className="form-person-content__label">Тариф</label>
                        <i className="fab fa-diaspora form-person-content__marker"></i>
                        <DropList 
                            className="form-person-content__input"
                            placeholder="Не выбрано"
                            value={data.rate}
                            // options={typeDocument}
                            disabled />
                    </div>
                </div>
                <div className="form-person-content__btns">
                    <Button 
                        className="form-person-content__btn"
                        onClick={setClosedCard} >
                            Выйти
                    </Button>
                    <Button
                        className="form-person-content__btn"
                        onClick={setSavePerson} >
                            Сохранить
                    </Button>
                    {errData === false ?
                        <p className="form-person-content__err">Заполните обязательные поля!</p>
                    : null}
                </div>
            </section>
        </form>
    );
};

export default FormPerson;