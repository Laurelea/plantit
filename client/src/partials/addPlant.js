import React from 'react'
import '../css/App.css';
import axios from "axios";
import MainStore from "../stores/MainStore";

const addPlantHandler = async (event) => {
        event.preventDefault();
        const plantData = {
            category: event.target.elements.category.value,
            plantSort: event.target.elements.plantSort.value,
            product : event.target.elements.product.value,
            producer : event.target.elements.producer.value,
            yeartype : (event.target.elements.yeartype.value == "a1") ? "однолетник" : "многолетник",
            rootstock : !!event.target.elements.rootstock.value,
            watering : event.target.elements.watering.value,
            soil: event.target.elements.soil.value,
            user_id: MainStore.currentUser.userID
        }
        console.log("MainStore.currentUser.userID: ", MainStore.currentUser.userID)
        // const test = event.target.elements.years.value
        console.log("plantData to send to server:", plantData)
        const response = await axios.post('/api/addplant', plantData)
            .then(response => {
                console.log("post.response.data: ", response.data);
                // this.setState({apiResponse: response.data.regSuccess, message: response.data.message});
                // console.log("apiResponse: ", this.state.apiResponse)
                // document.getElementById("apiID").innerText =  "API response:" + this.state.apiResponse
            })
            .then( response => {
                console.log("Am I here?");
                // this.resetForm()
            })
            .catch(error => {
                // handle error
                console.log(error);
            })

        // document.getElementsByClassName("errorspan")
    }

export default function addPlant() {
    return (
        <form name='Форма для добавления нового растения' id='MyAddForm' onSubmit={addPlantHandler} autoComplete="on">
            <h2 id="testBD">
                Добавить новое растение
            </h2>
            <label><p>Выберите категорию:</p></label>
            <select name="category" required>
                <option value="Herbs"></option>
                <option value="Herbs" selected={false}>Травы</option>
                <option value="Fruit">Фрукты</option>
                <option value="Vegs">Овощи</option>
                <option value="Decs">Декоративное</option>
            </select>
            <fieldset>
                <input type='text' placeholder='Сорт растения' autoFocus name='plantSort' required autoComplete="off" defaultValue={""}/>

                <input type='text' placeholder='Род растения' name='product' required autoComplete="on" defaultValue = {""}/>

                <input type='text' placeholder='Производитель семян' name='producer' required autoComplete="on" defaultValue = {""}/>
            </fieldset>
            <fieldset>
                <div>
                    Срок жизни растения:
                </div>
                <div>
                    <label>
                        <input className='radio' type='radio' name='yeartype' value="a1"/> Однолетник</label>
                    <label>
                        <input className='radio' type='radio' name='yeartype' value="a2"
                               defaultChecked={false}/> Многолетник</label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    Выращивание рассадой:
                </div>
                <div>
                    <input className='radio' type='radio' name='rootstock' value="a1" /> Обязательно
                    <input className='radio' type='radio' name='rootstock' value="a2" defaultChecked={false}/> Необязательно
                </div>
            </fieldset>
            <fieldset>
            <textarea name="watering" placeholder="Режим полива" autoComplete="off"></textarea>
            <textarea name="soil" placeholder="Требования к почве" autoComplete="off"></textarea>
            <div id="testID">
                Приложить фото семян:
            </div>
            <div><input type="file" name="file" multiple/>
            </div>
            <button type='submit'>Добавить</button>
            </fieldset>
        </form>
)
}