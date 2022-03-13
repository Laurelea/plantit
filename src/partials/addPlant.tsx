import React, { useState} from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import {ICat, IProduct, IReduxState, IUser, IProducer, IYearType} from "../store/types";

interface IAddPlantProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    products: Array<IProduct> | undefined,
    cats: Array<ICat> | undefined,
    producers: Array<IProducer> | undefined,
    yeartypes: Array<IYearType> | undefined,
}

interface IAddPlantState {
    products: Array<IProduct> | undefined,
    cats: Array<ICat> | undefined,
    currentCat: number | undefined,
    producers: Array<IProducer> | undefined,
    yeartypes: Array<IYearType> | undefined,
    // yeartypes: Array<string>,
}

const AddPlant = (props: IAddPlantProps) => {
    // console.log('25 yeartypes', props.yeartypes)
    const [state, setState] =  useState<IAddPlantState>({
        products: props.products,
        cats: props.cats,
        currentCat: undefined,
        producers: props.producers,
        yeartypes: props.yeartypes,
    })
    const updateNumberOfPlants = async() => {
        const data = {id: props.currentUser.userID}
        await axios.post('/api/getNumberOfPlants', data)
            .then(response => {
                    console.log("LK Got Plants: response.data: ", response.data)
                    props.updateUserInfo(response.data);
                }
            )
            .catch(error => {
                console.log("updateNumberOfPlants error: ", error);
            })
    }
    const selectCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('42 selectCat', e.target.value, typeof e.target.value)
        setState({
            ...state,
            currentCat: Number(e.target.value)})
    }
    const addPlantHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.currentTarget.reset();
        event.preventDefault();
        const plantData = {
            plantSort: event.currentTarget.plantSort.value,
            product : event.currentTarget.product.id,
            producer : event.currentTarget.producer.value,
            yeartype : (event.currentTarget.yeartype.value === "a1") ? "однолетник" : "многолетник",
            rootstock : !!event.currentTarget.rootstock.value,
            watering : event.currentTarget.watering.value,
            soil: event.currentTarget.soil.value,
            user_id: props.currentUser.userID
        }
        console.log("plantData to send to server:", plantData)
        await axios.post('/api/addplant', plantData)
            .then(response => {
                props.updateBase();
                updateNumberOfPlants();
                console.log("45 addplant  post.response.data: ", response.data);
                if (response.data.command === "INSERT") {
                    console.log("added ok")
                    window.alert("added ok")
                    // result = "Plant added successfully"
                } else {
                    console.log("Error addplant: " + response.data)
                    window.alert("error ((")
                    // result = response.data.error
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления нового растения' id='PlantAddForm' className='addForm' onSubmit={addPlantHandler}
              autoComplete="on">
            <h2>
                Добавить новое растение
            </h2>
            <label>
                <p>Выберите категорию:</p>
            </label>
            <select name="category" required className='select-add' onChange={selectCat}>
                <option></option>
                {state.cats
                    ? state.cats.map(item => (
                        <option key={item.cat_id} value={item.cat_id}>{item.cat_name}</option>
                    ))
                    : null
                }
            </select>
            <label>
                <p>Выберите вид растения:</p>
            </label>
            <select name="product" required className='select-add'>
                {state.products
                    ? state.products.filter(item => item.category == state.currentCat).sort((a, b) => (a.product_name > b.product_name) ? 1: -1).map(item => (
                    <option key={item.id} value={item.id}>{item.product_name}</option>
                ))
                    : <option>no products(</option>
                }
            </select>
            <label>
                <p>Выберите производителя семян:</p>
            </label>
            <select name="producer" required className='select-add'>
                {state.producers
                    ? state.producers.sort((a, b) => (a.producer_name > b.producer_name) ? 1: -1).map(item => (
                        <option key={item.id} value={item.id}>{item.producer_name}</option>
                    ))
                    : <option>no producers(</option>
                }
            </select>
            <label>
                <p>Введите название сорта:</p>
            </label>
            <fieldset>
                <input type='text' placeholder='Сорт растения: Машенька, Гигант, Роузи и тп.' autoFocus name='plantSort' required
                       autoComplete="off" defaultValue={""}/>
            </fieldset>
            <fieldset>
                <label>
                    <p>Дней до всходов:</p>
                </label>
                <div className="diaps">
                    <textarea name="days_to_seedlings_min" placeholder="Мин" autoComplete="off" className="diap"></textarea>
                    <textarea name="days_to_seedlings_max" placeholder="Макс" autoComplete="off" className="diap"></textarea>
                </div>
            </fieldset>
            <fieldset>
                <label>
                    <p>Высота растения:</p>
                </label>
            <div className="diaps">
                <textarea name="height_min" placeholder="Мин" autoComplete="off" className="diap"></textarea>
                <textarea name="height_max" placeholder="Макс" autoComplete="off" className="diap"></textarea>
            </div>
            </fieldset>
            <fieldset>
                <label>
                    <p>Посадка растения:</p>
                </label>
                <h3>Начало</h3>
                <div className="diaps">
                    <textarea name="planting_start_day" placeholder="день" autoComplete="off" className="diap"></textarea>
                    <textarea name="planting_start_month" placeholder="месяц" autoComplete="off" className="diap"></textarea>
                </div>
                <h3>Конец</h3>
                <div className="diaps">
                    <textarea name="planting_stop_day" placeholder="день" autoComplete="off" className="diap"></textarea>
                    <textarea name="planting_stop_month" placeholder="месяц" autoComplete="off" className="diap"></textarea>
                </div>

            </fieldset>
                <label>
                    <p>Приложить фото семян:</p>
                </label>
                <div>
                    <input type="file" name="file" multiple/>
                </div>
                <button type='submit'>Добавить</button>
        </form>
    )
}

export default connect((state: IReduxState) => ({
    currentUser: state.currentUser,
    products: state.products,
    cats: state.cats,
    producers: state.producers,
    yeartypes: state.yeartypes
}), { updateBase, updateUserInfo })(AddPlant);
