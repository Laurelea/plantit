import React from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo, updateCats } from "../store/actions";
import { ICat, IReduxState, IUser } from "../store/types";
import { API_URL } from "../config";

interface IAddCatProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    updateCats: () => void,
    cats: Array<ICat> | undefined,
}

const AddCat = (props: IAddCatProps) => {
    const addCatHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const catData = {
            category: event.currentTarget.category.value,
            cat_desc: event.currentTarget.desc.value,
            cat_pic: event.currentTarget.pic.value,
        }
        event.currentTarget.reset();
        console.log("catData to send to server:", catData)
        await axios.post(API_URL + 'api/addCat', catData)
            .then(response => {
                console.log("33 addCat  post.response.data: ", response.data);
                if (response.data.success) {
                    props.updateCats();
                }
                return response.data.message
            })
            .then(message => {
                window.alert(message)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления новой категории' id='CatAddForm' className='addForm'  onSubmit={addCatHandler}
              autoComplete="on">
            <h2 className='whole-line'>
                Добавить новую категорию
            </h2>
            <input type='text' placeholder='Новая категория' name='category' required autoComplete="on" className='whole-line add-input'/>
            <input type='text' placeholder='Описание' name='desc' required autoComplete="on" className='whole-line add-input'/>
            <input type='text' placeholder='Ссылка на картинку' name='pic' required autoComplete="on" className='whole-line add-input'/>
            <div className='whole-line'>
                <button type='submit' className='add-button'>Добавить</button>
            </div>
        </form>
    )
}

export default connect((state: IReduxState) => ({
    currentUser: state.currentUser,
    cats: state.cats,
}), { updateBase, updateUserInfo, updateCats })(AddCat);
