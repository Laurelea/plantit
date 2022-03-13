import React from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import {ICat, IReduxState, IUser} from "../store/types";

interface IAddPlantProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    cats: Array<ICat> | undefined,
}

const AddProducer = (props: IAddPlantProps) => {
    const addCatHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.currentTarget.reset();
        event.preventDefault();
        const plantData = {
            category: event.currentTarget.category.cat_id,
            plantSort: event.currentTarget.plantSort.value,
            product : event.currentTarget.product.value,
            producer : event.currentTarget.producer.value,
            yeartype : (event.currentTarget.yeartype.value === "a1") ? "однолетник" : "многолетник",
            rootstock : !!event.currentTarget.rootstock.value,
            watering : event.currentTarget.watering.value,
            soil: event.currentTarget.soil.value,
            user_id: props.currentUser.userID
        }
        console.log("ProducerData to send to server:", plantData)
        await axios.post('/api/addProducer', plantData)
            .then(response => {
                props.updateBase();
                console.log("33 addProducer  post.response.data: ", response.data);
                if (response.data.command === "INSERT") {
                    console.log("added ok")
                    window.alert("added ok")
                } else {
                    console.log("Error addProducer: " + response.data)
                    window.alert("error ((")
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления нового производителя' id='ProducerAddForm' className='addForm'  onSubmit={addCatHandler}
              autoComplete="on">
            <h2 className='whole-line'>
                Добавить нового производителя
            </h2>
            <input type='text' placeholder='Новый производитель' name='category' required autoComplete="on" className='whole-line add-input'/>
            <div className='whole-line'>
                <button type='submit' className='add-button'>Добавить</button>
            </div>
        </form>
    )
}

export default connect((state: IReduxState) => ({
    currentUser: state.currentUser,
    cats: state.cats,
}), { updateBase, updateUserInfo })(AddProducer);
