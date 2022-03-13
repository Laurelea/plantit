import React, { useState } from 'react'
import AddPlant from "./addPlant";
import AddProduct from "./addProduct";
import AddCat from "./addCat";

interface IAddNewState {
    option: number | undefined,
}

export const AddNew = () => {
    const [state, setState] = useState<IAddNewState>({
        option: undefined
    })
    const showAdd = (option: number) => {
        setState({
            ...state,
            option
        })
    }
    return (
        <React.Fragment>
            <button onClick={() => showAdd(1)}>Растение</button>
            <button onClick={() => showAdd(2)}>Вид</button>
            <button onClick={() => showAdd(3)}>Категория </button>
            {state.option == 1
                ? <AddPlant/>
                : state.option == 2
                    ? <AddProduct/>
                    : state.option == 3
                        ? <AddCat/>
                        : null}
        </React.Fragment>
    )
}
