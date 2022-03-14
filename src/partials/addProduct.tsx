import React, { useState } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import {ICat, IProducer, IProduct, IReduxState, IUser, IYearType} from "../store/types";

interface IAddProductProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    products: Array<IProduct> | undefined,
    cats: Array<ICat> | undefined,
    producers: Array<IProducer> | undefined,
    yeartypes: Array<IYearType> | undefined,
}

interface IAddProductState {
    products: Array<IProduct> | undefined,
    cats: Array<ICat> | undefined,
    currentCat: number | undefined,
    producers: Array<IProducer> | undefined,
    yeartypes: Array<IYearType> | undefined,
    // yeartypes: Array<string>,
}

const AddProduct = (props: IAddProductProps) => {
    const [state, setState] =  useState<IAddProductState>({
        products: props.products,
        cats: props.cats,
        currentCat: undefined,
        producers: props.producers,
        yeartypes: props.yeartypes,
    })
    const selectCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('42 selectCat', e.target.value, typeof e.target.value)
        setState({
            ...state,
            currentCat: Number(e.target.value)})
    }
    const addProductHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.currentTarget.reset();
        event.preventDefault();
        const plantData = {
            category: event.currentTarget.category.cat_id,
            plantSort: event.currentTarget.plantSort.value,
            product : event.currentTarget.product.value,
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
            <form name='Форма для добавления нового растения' id='ProductAddForm' className='addForm' onSubmit={addProductHandler}
                  autoComplete="on">
                <h2 className='whole-line'>
                    Добавить новый вид
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
                    Введите название вида:
                </label>
                    <input type='text' placeholder='Вид растения: Томат, Огурец и тп и тп.' autoFocus name='plantProduct' required
                           autoComplete="off" defaultValue={""} className='add-input'/>
                <label className='add-elem'>
                    Срок жизни растения:
                </label>
                <div className='radioField'>
                {state.yeartypes
                    ? state.yeartypes.map(item => {
                            return (
                                <React.Fragment>
                                    <label><input className='radio' type='radio' name='yeartype' value={item.id} id={item.name} key={item.id}/>{item.name}</label>
                                </React.Fragment>
                            )
                        })

                    : <p>no yeartypes(</p>}
                </div>
                <label className='add-elem'>
                    Выращивание рассадой:
                </label>
                <div className='radioField'>
                    <label><input className='radio' type='radio' name='rootstock' value="a1"/> Обязательно</label>
                    <label><input className='radio' type='radio' name='rootstock' value="a2" defaultChecked={false}/> Необязательно</label>
                </div>
                <label className='add-elem'>
                    Глубина посадки:
                </label>
                <div className="diaps">
                    <input type='text'  name="depth_min" placeholder="Мин" autoComplete="off" className="diap"></input>
                    <input type='text'  name="depth_max" placeholder="Макс" autoComplete="off" className="diap"></input>
                </div>
                <div className='whole-line'>
                    <textarea name="watering" placeholder="Режим полива" autoComplete="off" className='add-text'/>
                </div>
                <div className='whole-line'>
                    <textarea name="soil" placeholder="Требования к почве" autoComplete="off" className='add-text'/>
                </div>
                <div className='whole-line'>
                    <textarea name="sun" placeholder="Требования к солнцу" autoComplete="off" className='add-text'/>
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
}), { updateBase, updateUserInfo })(AddProduct);
