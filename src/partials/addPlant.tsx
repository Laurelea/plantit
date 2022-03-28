import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateBase, updateUserInfo } from '../store/actions';
import { ICat, IProduct, IReduxState, IUser, IProducer, IYearType } from '../store/types';
import { API_URL } from '../config';
import FormData from 'form-data';

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

interface IAddPlantProps {
    currentUser: IUser;
    updateUserInfo: (numberOfPlants: number) => void;
    updateBase: () => void;
    products: IProduct[] | undefined;
    cats: ICat[] | undefined;
    producers: IProducer[] | undefined;
    yeartypes: IYearType[] | undefined;
}

interface IAddPlantState {
    products: IProduct[] | undefined;
    cats: ICat[] | undefined;
    currentCat: number | undefined;
    producers: IProducer[] | undefined;
    yeartypes: IYearType[] | undefined;
    pic: File | undefined;
    error: string | undefined;
    preview: string | undefined;
}

const AddPlant = (props: IAddPlantProps) => {
    const [state, setState] =  useState<IAddPlantState>({
        products: props.products,
        cats: props.cats,
        currentCat: undefined,
        producers: props.producers,
        yeartypes: props.yeartypes,
        pic: undefined,
        preview: undefined,
        error: undefined,
    });
    const updateNumberOfPlants = async() => {
        const data = {id: props.currentUser.userID};
        await axios.post('/api/getNumberOfPlants', data)
            .then(response => {
                    console.log('LK Got Plants: response.data: ', response.data);
                    props.updateUserInfo(response.data);
                }
            )
            .catch(error => {
                console.log('updateNumberOfPlants error: ', error);
            });
    };
    const selectCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('42 selectCat', e.target.value, typeof e.target.value);
        setState({
            ...state,
            currentCat: Number(e.target.value)});
    };
    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('53 addPlant imageChange', e);
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const pic = e.currentTarget.files[0];
            const splitFileName = pic.name.split('.');
            const extension = splitFileName[splitFileName.length - 1].toLowerCase();
            if (!['jpg', 'jpeg', 'bmp', 'png'].includes(extension)) {
                window.alert('supported file extension only jpg/jpeg/bmp/png');
                return;
            } else {
                console.log('62 addPlant imageChange')
                setState({
                    ...state,
                    pic,
                    preview: URL.createObjectURL(pic)
                });
            }
        }
    }
    const addPlantHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!state.pic) {
            window.alert('no picture selected')
            return;
        }
        const formData = new FormData();
        formData.append('pic', state.pic);
        formData.append('product_id', event.currentTarget.product.value);
        formData.append('producer_id', event.currentTarget.producer.value);
        formData.append('name', capitalizeFirstLetter(event.currentTarget.plantSort.value));
        formData.append('days_to_seedlings_min', parseInt(event.currentTarget.days_to_seedlings_min.value));
        formData.append('days_to_seedlings_max', parseInt(event.currentTarget.days_to_seedlings_max.value));
        formData.append('height_max', parseInt(event.currentTarget.height_max.value));
        formData.append('height_min', parseInt(event.currentTarget.height_min.value));
        formData.append('planting_start_day', parseInt(event.currentTarget.planting_start_day.value));
        formData.append('planting_start_month', parseInt(event.currentTarget.planting_start_month.value));
        formData.append('planting_stop_day', parseInt(event.currentTarget.planting_stop_day.value));
        formData.append('planting_stop_month', parseInt(event.currentTarget.planting_stop_month.value));
        formData.append('user_id', props.currentUser.userID);
        event.currentTarget.reset();
        console.log("plantData to send to server:", formData)
        await axios.post(`${API_URL}/addplant`, formData, {
            headers: {
                ...formData.getHeaders
            }
        })
            .then(async response => {
                window.alert(response.data.message)
                console.log("33 addplant  post.response.data: ", response.data);

                if (response.data.success) {
                    // window.alert('succ')

                    props.updateBase();
                    await updateNumberOfPlants();
                } else {
                    window.alert(response.data.message)
                }
                setState({
                    ...state,
                    pic: undefined,
                    preview: undefined,
                    error: undefined,
                })
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
                    ? state.products.filter(item => item.category === state.currentCat).sort((a, b) => (a.product_name > b.product_name) ? 1: -1).map(item => (
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
            <label className="add-elem">
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
            <label className="add-elem">
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
            <div className='add-photo'>
                <p>Приложить фото семян:</p>
                <input type="file"  accept="image/*" name="pic" className='add-input file' onChange={imageChange}/>
                <img id="myImg" src={state.preview} alt='' width='150px'/>
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
