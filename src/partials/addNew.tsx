import React, { useState } from 'react'
import AddPlant from "./addPlant";
import AddProduct from "./addProduct";
import AddCat from "./addCat";
import AddProducer from './addProducer'
import '../css/addForms.css';

interface IAddNewState {
    option: number | undefined,
}

interface IAddNewProps {
    currAdd: number,
}

export const AddNew = (props: IAddNewProps) => {
    console.log(props)
    const [state, setState] = useState<IAddNewState>({
        option: undefined
    })
    const adds = [
        {
            id: 1,
            name: 'Растение',
            elem: <AddPlant/>
        },
        {
            id: 2,
            name: 'Вид',
            elem: <AddProduct/>
        },
        {
            id: 3,
            name: 'Категория',
            elem: <AddCat/>
        },
        {
            id: 4,
            name: 'Производитель',
            elem: <AddProducer/>
        },
    ]
    const showAdd = (option: number) => {
        setState({
            ...state,
            option
        })
    }
    return (
        <React.Fragment>
            {adds.map(but => {
                return (
                    <button onClick={() => showAdd(but.id)} key={but.id}>{but.name}</button>
                )
            })}
            {state.option ? adds[state.option-1].elem : null}
        </React.Fragment>
    )
}
