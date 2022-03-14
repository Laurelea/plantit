import { Irow } from "../store/types";
import '../css/plantCard.css';
import { IReduxState } from "../store/types";
import { updateBase } from "../store/actions";
import { connect } from "react-redux";
import {useState} from "react";

interface ICardsProps {
    dbToPrint: undefined | Array<Irow>,
    updateBase: () => void,
    cat: number,
}

interface IplantCardsState {
    showBig: boolean;
    item: Irow | undefined,
}

const PlantCards = (props: ICardsProps) => {
    const [state, setState] = useState<IplantCardsState>({
        showBig: false,
        item: undefined,
    });
    const openBigCard = (item: Irow) => {
        console.log('tik:', item);
        setState({
            ...state,
            showBig: true,
            item: item,
        })
    };
    const closeModal = () => {
        console.log('modal closed');
        setState({
            ...state,
            showBig: false,
        })
    }
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
        console.log('plant in Bigcard:', state.item)
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
                            <div className="button-big">edit</div>
                            <div className="button-big" onClick={closeModal}>close</div>
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
    if (props.dbToPrint) {
        return (
            <div className='cards'>
            <PlantCardBig/>
            {props.dbToPrint.filter(item => (item.cat_id === props.cat)).map((item: Irow) => {
                // console.log('60 item:', item)
                return (
                    // <div>
                        <PlantCardMin {...item} key={item.id}/>
                    // </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <p>no dbToPrint</p>
        )
    }
}

const mapStateToProps = (state: IReduxState) => ({
    dbToPrint: state.dbToPrint
})

const mapDispatchToProps = ({
    updateBase,
})

const Cards = connect(mapStateToProps, mapDispatchToProps)(PlantCards);

export default Cards
