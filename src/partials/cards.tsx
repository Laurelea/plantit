import { ICat, IProducer, IProduct, Irow, IUser, IYearType } from "../store/types";
import '../css/plantCard.css';
import { IReduxState } from "../store/types";
import { updateBase, updateUserInfo } from "../store/actions";
import { connect } from "react-redux";
import React, { useState} from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useHistory } from 'react-router-dom';

interface ICardsProps {
    dbToPrint: undefined | Array<Irow>,
    updateBase: () => void,
    sortCat: number,
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    products: IProduct[] | undefined,
    cats: ICat[] | undefined,
    producers: IProducer[] | undefined,
    yeartypes: IYearType[] | undefined,
}

interface IPlantCardsState {
    showBig: boolean,
    item: Irow | undefined,
    showEdit: boolean,
    products: IProduct[] | undefined,
    cats: ICat[] | undefined,
    producers: IProducer[] | undefined,
    yeartypes: IYearType[] | undefined,
    pic: File | undefined,
    error: string | undefined,
    preview: string | undefined,
}

interface IPLantChangesState {
    currentCat: number | undefined,
    currentProduct: number | undefined,
}
const PlantCards = (props: ICardsProps) => {
    const [state, setState] = useState<IPlantCardsState>({
        showBig: false,
        item: undefined,
        showEdit: false,
        products: props.products,
        cats: props.cats,
        producers: props.producers,
        yeartypes: props.yeartypes,
        pic: undefined,
        preview: undefined,
        error: undefined,
    });
    const [changes, setChanges] = useState<IPLantChangesState>({
        currentCat: undefined,
        currentProduct: undefined,
    })
    const openBigCard = (item: Irow) => {
        console.log('tik:', item);
        setState({
            ...state,
            showBig: true,
            item: item,
        })
    };
    const closeShowBig = () => {
        console.log('modal closed');
        setState({
            ...state,
            showBig: false,
        })
    };
    const showEditPlant = () => {
        console.log('item to edit:', state.item? state.item.id : null);
        setState({
            ...state,
            showBig: false,
            showEdit: true,
        })
    };
    const closeCardEdit = () => {
        setState({
            ...state,
            showBig: true,
            showEdit: false,
        })
        setChanges({
            ...changes,
            currentCat: undefined,
            currentProduct: undefined,
        })
    }
    const saveChanges = () => {
        // axios changes
        setState({
            ...state,
            showBig: true,
            showEdit: false,
        })
    };
    const history = useHistory();
    const forwardToAddPage = () => {
        console.log('91 trigger')
        history.push("/addNew");
    };
    const selectCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('95 cards selectCat', e.target.value, typeof e.target.value)
        setChanges({
            ...changes,
            currentCat: Number(e.target.value)})
    };
    const selectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('111 cards selectProduct', e.target.value, typeof e.target.value)
        setChanges({
            ...changes,
            currentProduct: Number(e.target.value)})
    };
    const delPlant = async () => {
        const answer = window.confirm(`Delete the plant? ${state.item?.id}-${state.item?.name}`);
        if (answer) {
            await axios.put(`${API_URL}/delplant`, { id: state.item?.id }, {
            })
                .then((response) => {
                    console.log('53 delplant axios response', response)
                    if (response.data.success) {
                        // window.alert('plant deleted');
                        closeShowBig();
                        props.updateBase();
                    } else {
                        window.alert(`smth failed: ${response.data.message}`)
                    }
                })
                .catch(err => {
                    console.log('56 delplant smth went wrong:', err)
                })
        }
        else {
            //some code
        }
    };
    const PlantCardMin = (item: Irow) => {
        return (
            <div className="plantcard-min" onClick={() => openBigCard(item)}>
                <div className="category">{item.cat_name}</div>
                <div className="pic">
                    <img
                    src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
                    className="img" alt=''/>
                </div>
                <div className="left product">{item.product_name}</div>
                <div className="left producer">{item.producer_name}</div>
                <div className="left name">{item.name}</div>
            </div>
        )
    };
    const PlantCardBig = () => {
        // console.log('plant in Bigcard:', state.item)
        if (state.item && state.showBig) {
            return (
                <div className="plantcard-big">
                    <div className='bigcart-desc'>
                        <div className="big-card-titles">
                            <p className='big-card-line'>Категория:</p>
                            <p className='big-card-line'>{state.item.cat_name}</p>
                            <p className='big-card-line'>Культура:</p>
                            <p className='big-card-line'>{state.item.product_name}</p>
                            <p className='big-card-line'>Сорт:</p>
                            {/*<input type='text' placeholder={state.item.name} name='plantSort' required*/}
                            {/*       autoComplete="off" className='add-input'/>*/}
                            <p className='big-card-line'>{state.item.name}</p>
                            <p className='big-card-line'>Производитель семян:</p>
                            <p className='big-card-line'>{state.item.producer_name}</p>
                            <p className='big-card-line'>Требования к почве:</p>
                            <p className='big-card-line'>{state.item.soil}</p>
                            <p className='big-card-line'>Требования к поливу: </p>
                            <p className='big-card-line'>{state.item.watering}</p>
                            <p className='big-card-line'>Высаживание рассадой: </p>
                            <p className='big-card-line'>{state.item.rootstock ? 'Обязательно' : 'Не обязательно'}</p>
                            <p className='big-card-line'>Жизненный цикл: </p>
                            <p className='big-card-line'>{state.item.yeartype}</p>
                            <p className='big-card-line'>Глубина посадки, мм: </p>
                            <p className='big-card-line'>{state.item.depth_min}-{state.item.depth_max}</p>
                            <p className='big-card-line'>Высота растения, см: </p>
                            <p className='big-card-line'>{state.item.height_min}-{state.item.height_max}</p>
                            <p className='big-card-line'>Дней от посадки до всходов: </p>
                            <p className='big-card-line'>{state.item.days_to_seedlings_min}-{state.item.days_to_seedlings_max}</p>
                            <p className='big-card-line'>Посадка: </p>
                            <p className='big-card-line'>{state.item.planting_start_day}.{state.item.planting_start_month}-
                                {state.item.planting_stop_day}.{state.item.planting_stop_month}</p>
                            <p className='big-card-line'>Солнце:</p>
                            <p className='big-card-line'>{state.item.sun}</p>
                            <p className='big-card-line'>Добавил:</p>
                            <p className='big-card-line'>{state.item.user_name}</p>
                        </div>
                        <div className="buttons-big">
                            <button id="close_card" type="button" className="button-big" onClick={delPlant}>del</button>
                            <button id="edit_plant" type="button" className="button-big" onClick={showEditPlant}>edit</button>
                            <button id="close_card" type="button" className="button-big" onClick={closeShowBig}>close</button>
                        </div>
                    </div>
                    <div className="pic-big">
                        <img
                        src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
                        className="img" alt=''/>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
    const PlantCardEdit = () => {
        // console.log('plant in PlantCardEdit:', state.item)
        if (state.item && state.showEdit) {
            return (
                <div className="plantcard-big">
                    <div className='bigcart-desc'>
                        <div className="big-card-titles">
                            <p className='big-card-line'>Категория:</p>
                            <div className='edit-extended-line'>
                                <select name="category" required className='select-add' value={changes.currentCat ? changes.currentCat : state.item.cat_id} onChange={selectCat}>
                                    {state.cats
                                        ? state.cats.map(item => (
                                            <option key={item.cat_id} value={item.cat_id}>{item.cat_name}</option>
                                        ))
                                        : null
                                    }
                                </select>
                                <button onClick={() => forwardToAddPage()} className='small-add-button'>+</button>
                            </div>
                            {/*<p className='big-card-line'>{state.item.cat_name}</p>*/}
                            <p className='big-card-line'>Культура:</p>
                            <div className='edit-extended-line'>
                                <select name="product" required className='select-add' defaultValue={state.item.product_id} onChange={selectProduct}>
                                    {/*onChange={selectCat}*/}
                                    {state.products
                                        ? state.products
                                            .filter(item => changes.currentCat
                                                ? item.category === changes.currentCat
                                                : item.category === state.item?.cat_id)
                                            .sort((a, b) => (a.product_name > b.product_name) ? 1: -1)
                                            .map(item => (
                                            <option key={item.id} value={item.id}>{item.product_name}</option>
                                        ))
                                        : <option>no products(</option>
                                    }
                                </select>
                                <button onClick={() => forwardToAddPage()} className='small-add-button'>+</button>
                            </div>
                            {/*<p className='big-card-line'>{state.item.product_name}</p>*/}
                            <p className='big-card-line'>Сорт:</p>
                            {/*<input type='text' placeholder={state.item.name} name='plantSort' required*/}
                            {/*       autoComplete="off" className='add-input'/>*/}
                            <p className='big-card-line'>{state.item.name}</p>
                            <p className='big-card-line'>Производитель семян:</p>
                            <div className='edit-extended-line'>
                                <select name="producer" required className='select-add' defaultValue={state.item.producer_id}>
                                    {state.producers
                                        ? state.producers.sort((a, b) => (a.producer_name > b.producer_name) ? 1: -1).map(item => (
                                            <option key={item.id} value={item.id}>{item.producer_name}</option>
                                        ))
                                        : <option>no producers(</option>
                                    }
                                </select>
                                <button onClick={() => forwardToAddPage()} className='small-add-button'>+</button>
                            </div>
                            {/*<p className='big-card-line'>{state.item.producer_name}</p>*/}
                            <p className='big-card-line'>Требования к почве:</p>
                            <p className='big-card-line'>{state.item.soil}</p>
                            <p className='big-card-line'>Требования к поливу: </p>
                            <p className='big-card-line'>{state.item.watering}</p>
                            <p className='big-card-line'>Высаживание рассадой: </p>
                            <p className='big-card-line'>{state.item.rootstock ? 'Обязательно' : 'Не обязательно'}</p>
                            <p className='big-card-line'>Жизненный цикл: </p>
                            <p className='big-card-line'>{state.item.yeartype}</p>
                            <p className='big-card-line'>Глубина посадки, мм: </p>
                            <p className='big-card-line'>{state.item.depth_min}-{state.item.depth_max}</p>
                            <p className='big-card-line'>Высота растения, см: </p>
                            <p className='big-card-line'>{state.item.height_min}-{state.item.height_max}</p>
                            <p className='big-card-line'>Дней от посадки до всходов: </p>
                            <p className='big-card-line'>{state.item.days_to_seedlings_min}-{state.item.days_to_seedlings_max}</p>
                            <p className='big-card-line'>Посадка: </p>
                            <p className='big-card-line'>{state.item.planting_start_day}.{state.item.planting_start_month}-
                                {state.item.planting_stop_day}.{state.item.planting_stop_month}</p>
                            <p className='big-card-line'>Солнце:</p>
                            <p className='big-card-line'>{state.item.sun}</p>
                            <p className='big-card-line'>Добавил:</p>
                            <p className='big-card-line'>{state.item.user_name}</p>
                        </div>
                        <div className="buttons-big">
                            <button id="edit_plant" type="button" className="button-big" onClick={saveChanges}>save</button>
                            <button id="close_card" type="button" className="button-big" onClick={closeCardEdit}>close</button>
                        </div>
                    </div>
                    <div className="pic-big">
                        <img
                            src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
                            className="img" alt=''/>
                    </div>
                </div>
            )
        } else {
            return null
        }
    };
    if (props.dbToPrint) {
        return (
            <div className='cards'>
            {props.dbToPrint.filter(item => (item.cat_id === props.sortCat)).map((item: Irow) => {
                return (
                    <PlantCardMin {...item} key={item.id}/>
                    )
                })}
            <PlantCardBig/>
            <PlantCardEdit/>
            </div>
        )
    } else {
        return (
            <p>no dbToPrint</p>
        )
    };
}

const mapStateToProps = (state: IReduxState) => ({
    dbToPrint: state.dbToPrint,
    currentUser: state.currentUser,
    products: state.products,
    cats: state.cats,
    producers: state.producers,
    yeartypes: state.yeartypes,
})

const mapDispatchToProps = ({
    updateBase,
    updateUserInfo,
})

const Cards = connect(mapStateToProps, mapDispatchToProps)(PlantCards);

export default Cards
