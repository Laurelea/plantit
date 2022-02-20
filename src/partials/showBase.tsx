import { NavLink } from "react-router-dom";

const ShowBase = () => {
    return (
        <div className="DBwrapper">
            <h2>
                База растений:
            </h2>
            <div className="DBItemWrapper">
                <img src='../pics/vegs.jpg' alt="Vegs"/>
                <dl className="def-list-1">
                    <dt>
                        <NavLink to="/vegs"> Овощи </NavLink>
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
                        <NavLink to="/fruit"> Фрукты </NavLink>
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
                        <NavLink to="/herbs"> Травы </NavLink>
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
                        <NavLink to="/decs"> Декоративные </NavLink>
                    </dt>
                    <dd>
                        Цветы
                    </dd>
                </dl>
            </div>
        </div>
    )
}

export default ShowBase
