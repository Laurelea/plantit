import React, { useState } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo, updateProducts } from "../store/actions";
import { ICat, IProducer, IProduct, IReduxState, IUser, IYearType} from "../store/types";
import { API_URL } from "../config";

interface IAddProductProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    updateProducts: () => void,
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

interface IproductData {
    category: number,
    product: string,
    yeartype: number,
    rootstock: boolean,
    depth_min: number,
    depth_max: number,
    watering : string,
    soil: string,
    sun: string,
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
        event.preventDefault();
        console.log('57 CT ', event.currentTarget)
        const productData: IproductData = {
            category: event.currentTarget.category.value,
            product: event.currentTarget.product.value,
            yeartype: parseInt(event.currentTarget.yeartype.value),
            rootstock: Boolean(parseInt(event.currentTarget.rootstock.value)),
            depth_min: parseInt(event.currentTarget.depth_min.value),
            depth_max: parseInt(event.currentTarget.depth_max.value),
            watering : event.currentTarget.watering.value,
            soil: event.currentTarget.soil.value,
            sun: event.currentTarget.sun.value,
        }
        event.currentTarget.reset();
        console.log("productData to send to server:", productData)
        await axios.post(API_URL + 'api/addProduct', productData)
            .then(response => {
                console.log("33 addProduct  post.response.data: ", response.data);
                if (response.data.success) {
                    props.updateProducts();
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
            <form name='Форма для добавления нового вида' id='ProductAddForm' className='addForm' onSubmit={addProductHandler}
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
                    <input type='text' placeholder='Вид растения: Томат, Огурец и тп и тп.' autoFocus name='product' required
                           autoComplete="off" className='add-input'/>
                <label className='add-elem'>
                    Срок жизни растения:
                </label>
                <div className='radioField'>
                {state.yeartypes
                    ? state.yeartypes.map(item => {
                            return (
                                <label  key={item.id}><input className='radio' type='radio' name='yeartype' value={item.id} id={item.name}/>{item.name}</label>
                            )
                        })
                    : <p>no yeartypes(</p>}
                </div>
                <label className='add-elem'>
                    Выращивание рассадой:
                </label>
                <div className='radioField'>
                    <label><input className='radio' type='radio' name='rootstock' value='1'/>Обязательно</label>
                    <label><input className='radio' type='radio' name='rootstock' value="0" defaultChecked={true}/>Необязательно</label>
                </div>
                <label className='add-elem'>
                    Глубина посадки, мм:
                </label>
                <div className="diaps">
                    <input type='text'  name="depth_min" placeholder="Мин" autoComplete="off" className="diap" defaultValue='0'></input>
                    <input type='text'  name="depth_max" placeholder="Макс" autoComplete="off" className="diap" defaultValue='0'></input>
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
}), { updateBase, updateUserInfo, updateProducts })(AddProduct);
