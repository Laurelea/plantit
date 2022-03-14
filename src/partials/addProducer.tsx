import React from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import { ICat, IReduxState, IUser } from "../store/types";
import { API_URL } from "../config";

interface IAddProducerProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    cats: Array<ICat> | undefined,
}

const AddProducer = (props: IAddProducerProps) => {
    const addProducerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const producerData = {
            producer : event.currentTarget.producer.value,
        }
        event.currentTarget.reset();
        console.log("ProducerData to send to server:", producerData)
        await axios.post(API_URL + 'api/addProducer', producerData)
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
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления нового производителя' id='ProducerAddForm' className='addForm'  onSubmit={addProducerHandler}
              autoComplete="on">
            <h2 className='whole-line'>
                Добавить нового производителя
            </h2>
            <input type='text' placeholder='Новый производитель' name='producer' required autoComplete="on" className='whole-line add-input'/>
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
