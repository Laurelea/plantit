import React from 'react'
import './../App.css';

export default function ShowBase(props) {
    return (
        <div className="DBwrapper">
            <h2>
                База растений:
            </h2>
            <div className="DBItemWrapper">
                <img src='../pics/vegs.jpg' alt="Vegs"/>
                <dl className="def-list-1">
                    <dt>
                        <a href="/vegs"> Овощи </a>
                    </dt>
                    <dd>
                        Различные овощи - бахчевые, бобовые и тп.
                    </dd>
                </dl>
            </div>
            <div className="DBItemWrapper">
                <img src="../pics/fruits.jpg"/>
                <dl className="def-list-1">
                    <dt>
                        <a href="/vegs"> Фрукты </a>
                    </dt>
                    <dd>
                        Различные фрукты и ягоды
                    </dd>
                </dl>
            </div>
            <div className="DBItemWrapper">
                <img src="../pics/herbs.jpg"/>
                <dl className="def-list-1">
                    <dt>
                        <a href="/vegs"> Травы </a>
                    </dt>
                    <dd>
                        Травы - пряные, лечебные и в чай
                    </dd>
                </dl>
            </div>
            <div className="DBItemWrapper">
                <img src="../pics/decs.jpg"/>
                <dl className="def-list-1">
                    <dt>
                        <a href="/vegs"> Декоративные </a>
                    </dt>
                    <dd>
                        Цветы
                    </dd>
                </dl>
            </div>
        </div>

    )
}