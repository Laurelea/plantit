import { Irow } from "../store/types";
import '../css/plantCard.css';
import { IReduxState } from "../store/types";
import { updateBase } from "../store/actions";
import { connect } from "react-redux";

interface ICardsProps {
    dbToPrint: undefined | Array<Irow>,
    updateBase: () => void,
    cat: number,
}

// interface IPlantCardMin {
//     item: Irow,
//     key: number,
// }

// const PlantCardBig = () => {
//     // console.log('plant in card:', plant)
//     return (
//         <div className="plantcard-main">
//             <div className="category">Декоративные</div>
//             <div className="pic"><img
//                 src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
//                 className="img"/></div>
//             <div className="left product">Томаты</div>
//             <div className="left descr">очень вкусные</div>
//             <div className="left producer">ПОИСК</div>
//             <div className="left name">Каролинка</div>
//             <div className="buttons">edit</div>
//             <div className="left opts">
//                 Однолетник
//                 Сажать рассадой
//             </div>
//         </div>
//     )
// }


// const PlantCard = (plant: Irow) => {
//     console.log('plant in card:', plant)
const PlantCardMin = (item: Irow) => {
    const openBigCard = (itemId: number) => {
        console.log('tik:', itemId)

    };
    return (
        <div className="plantcard-min" onClick={() => openBigCard(item.id)}>
            <div className="category">{item.cat_name}</div>
            <div className="pic"><img
                src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
                className="img" alt=''/></div>
            <div className="left product">{item.product_name}</div>
            <div className="left producer">{item.producer_name}</div>
            <div className="left name">{item.name}</div>
        </div>
    )
}

const plantCards = (props: ICardsProps) => {
    console.log('Cards props cat:', props.cat, typeof props.cat)
    if (props.dbToPrint) {
        return (
            <div className='cards'>
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

const Cards = connect(mapStateToProps, mapDispatchToProps)(plantCards);

export default Cards
