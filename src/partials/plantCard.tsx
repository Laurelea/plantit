// import React from 'react';

import {Irow} from "../store/types";
import './css/plantCard.css';

const plantCard = (plant: Irow) => {
    console.log('plant in card:', plant)
    return (
        <div className="plantcard-main">
            <div className="category">Декоративные</div>
            <div className="pic"><img
                src='https://semenagavrish.ru/wa-data/public/shop/products/06/47/4706/images/8684/8684.290.jpg'
                className="img"/></div>
            <div className="left product">Томаты</div>
            <div className="left descr">очень вкусные</div>
            <div className="left producer">ПОИСК</div>
            <div className="left name">Каролинка</div>
            <div className="buttons">edit</div>
            <div className="left opts">
                Однолетник
                Сажать рассадой
            </div>
        </div>
    )
}

export default plantCard
