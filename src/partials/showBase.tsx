import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { getCats } from "./allBase";

interface ICats {
    cat_id: number,
    cat_name: string,
    cat_pic: string,
    cat_desc: string,
    parent: number,
}

interface IShowBaseState {
    cats: undefined | Array<ICats>,
}

const ShowBase = () => {
    const [state, setState] = useState<IShowBaseState>({
        cats: undefined,
    });
    useEffect(() => {
        getCats()
            .then((response: any) => {
                console.log('9 newCats', response)
                setState({
                    ...state,
                    cats: response,
                })
            })
    }, []);
    return (
        <React.Fragment>
            <div className="showBaseHeader">
                <h2>
                    База растений
                </h2>
            </div>
            {state.cats? state.cats.map((cat) => {
                return (
                        <div className='cat DBItemWrapper' key={cat.cat_id}>
                            <img src={cat.cat_pic} alt={cat.cat_name}/>
                            <div className='def-list-1'>
                                <NavLink to="/vegs"> {cat.cat_name} </NavLink>
                                <p>
                                    {cat.cat_desc}
                                </p>
                            </div>
                        </div>
                    )
            }) : <p>No cats found</p>}
        </React.Fragment>
    )
}

export default ShowBase
