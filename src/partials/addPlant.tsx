import React, { useState} from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import { ICat, IProduct, IReduxState, IUser, IProducer, IYearType } from "../store/types";
import { API_URL } from "../config";

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
}

const AddPlant = (props: IAddPlantProps) => {
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
        event.preventDefault();
        const plantData = {
            product_id: event.currentTarget.product.value,
            producer_id: event.currentTarget.producer.value,
            name: event.currentTarget.plantSort.value,
            days_to_seedlings_min: parseInt(event.currentTarget.days_to_seedlings_min.value),
            days_to_seedlings_max: parseInt(event.currentTarget.days_to_seedlings_max.value),
            height_max: parseInt(event.currentTarget.height_max.value),
            height_min: parseInt(event.currentTarget.height_min.value),
            planting_start_day: parseInt(event.currentTarget.planting_start_day.value),
            planting_start_month: parseInt(event.currentTarget.planting_start_month.value),
            planting_stop_day: parseInt(event.currentTarget.planting_stop_day.value),
            planting_stop_month: parseInt(event.currentTarget.planting_stop_month.value),
            plant_pic: event.currentTarget.pic.value,
            user_id: props.currentUser.userID
        }
        event.currentTarget.reset();
        console.log("plantData to send to server:", plantData)
        await axios.post(API_URL + 'api/addplant', plantData)
            .then(response => {
                console.log("33 addplant  post.response.data: ", response.data);
                if (response.data.success) {
                    props.updateBase();
                    updateNumberOfPlants();
                }
                return response.data.message
            })
            .then(message => {
                window.alert(message)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления нового растения' id='PlantAddForm' className='addForm' onSubmit={addPlantHandler}
              autoComplete="on">
            <h2 className='whole-line'>
                Добавить новое растение
            </h2>
            <label className='add-elem'>
                Выберите категорию:
            </label>
            <select name="category" required className='select-add' onChange={selectCat}>
                <option> </option>
                {state.cats
                    ? state.cats.map(item => (
                        <option key={item.cat_id} value={item.cat_id}>{item.cat_name}</option>
                    ))
                    : null
                }
            </select>
            <label className='add-elem'>
                Выберите вид растения:
            </label>
            <select name="product" required className='select-add'>
                {state.products
                    ? state.products.filter(item => item.category == state.currentCat).sort((a, b) => (a.product_name > b.product_name) ? 1: -1).map(item => (
                    <option key={item.id} value={item.id}>{item.product_name}</option>
                ))
                    : <option>no products(</option>
                }
            </select>
            <label className='add-elem'>
                Выберите производителя семян:
            </label>
            <select name="producer" required className='select-add'>
                {state.producers
                    ? state.producers.sort((a, b) => (a.producer_name > b.producer_name) ? 1: -1).map(item => (
                        <option key={item.id} value={item.id}>{item.producer_name}</option>
                    ))
                    : <option>no producers(</option>
                }
            </select>
            <label className='add-elem'>
                Введите название сорта:
            </label>
                <input type='text' placeholder='Сорт растения: Машенька, Гигант, Роузи и тп.' autoFocus name='plantSort' required
                       autoComplete="off" className='add-input'/>
            <label className='add-elem'>
                Дней до всходов:
            </label>
            <div className="diaps">
                <input name="days_to_seedlings_min" type='text' placeholder="Мин" className="diap" defaultValue='0'></input>
                {/*<textarea name="days_to_seedlings_min" placeholder="Мин" autoComplete="off" className="diap"></textarea>*/}
                <input name="days_to_seedlings_max" type='text' placeholder="Макс" autoComplete="off" className="diap" defaultValue='0'></input>
            </div>
            <label className='add-elem'>
                Высота растения:
            </label>
            <div className="diaps">
                <input type='text' name="height_min" placeholder="Мин" autoComplete="off" className="diap" defaultValue='0'></input>
                <input type='text' name="height_max" placeholder="Макс" autoComplete="off" className="diap" defaultValue='0'></input>
            </div>
            <label className='add-elem'>
                Посадка растения. Начало
            </label>
            <div className="diaps">
                <input type='text' name="planting_start_day" placeholder="день" autoComplete="off" className="diap" defaultValue='0'></input>
                <input type='text' name="planting_start_month" placeholder="месяц" autoComplete="off" className="diap" defaultValue='0'></input>
            </div>
            <label className='add-elem'>
                Посадка растения. Конец
            </label>
            <div className="diaps">
                <input type='text' name="planting_stop_day" placeholder="день" autoComplete="off" className="diap" defaultValue='0'></input>
                <input type='text' name="planting_stop_month" placeholder="месяц" autoComplete="off" className="diap" defaultValue='0'></input>
            </div>
            <label className='add-elem'>
                Приложить фото семян:
            </label>
            <div className='add-photo'>
                <input type="file" name="pic" className='add-input file' multiple />
            </div>
            <div className='whole-line'>
                <button type='submit' className='add-button'>Добавить</button>
            </div>
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
