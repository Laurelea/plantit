import React from "react";
import { NavLink } from "react-router-dom";

const ShowBase = () => {
    return (
        <React.Fragment>
            <div className="showBaseHeader">
                <h2>
                    База растений
                </h2>
            </div>
            <div className="Vegs DBItemWrapper">
                <img src="../cat_pics/vegs.jpg" alt="Vegs"/>
                <div className="def-list-1">
                    <NavLink to="/vegs"> Овощи </NavLink>
                    <p>
                        Различные овощи - бахчевые, бобовые и тп.
                    </p>
                </div>
            </div>
            <div className="Fruit DBItemWrapper">
                <img alt="fruit" src="../cat_pics/fruits.jpg"/>
                <div className="def-list-1">
                    <NavLink to="/fruit"> Фрукты </NavLink>
                    <p>
                        Различные фрукты и ягоды
                    </p>
                </div>
            </div>
            <div className="Herbs DBItemWrapper">
                <img alt="herbs" src="../cat_pics/herbs.jpg"/>
                <div className="def-list-1">
                    <NavLink to="/herbs"> Травы </NavLink>
                    <p>
                        Травы - пряные, лечебные и в чай
                    </p>
                </div>
            </div>
            <div className="Decs DBItemWrapper">
                <img alt="decs" src="../cat_pics/decs.jpg"/>
                <div className="def-list-1">
                    <NavLink to="/decs"> Декоративные </NavLink>
                    <p>
                        Цветы
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShowBase
