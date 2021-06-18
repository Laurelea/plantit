import React from 'react'
import './../App.css';
import axios from "axios";

const addPlantHandler = async (event) => {
        event.preventDefault();
        const plantData = {
            category: "Herbs",
            sort: "Весенняя",
            type : "Ромашка",
            producer : "Поиск",
            yeartype : "a1",
            rootstock : "a2",
            watering : '',
            soil: ''
        }
        console.log("event.target", event.target.children)
        // const plantData = event.target
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
                <option value="Herbs">Травы</option>
                <option value="Fruit">Фрукты</option>
                <option value="Vegs">Овощи</option>
                <option value="Decs">Декоративное</option>
            </select>
            <fieldset>
                <input type='text' placeholder='Название сорта' autoFocus name='sort' required autoComplete="off"/>

                <input type='text' placeholder='Название типа' name='type' required autoComplete="on"/>

                <input type='text' placeholder='Производитель' name='producer' required autoComplete="on"/>
            </fieldset>
            <fieldset>
                <div>
                    Срок жизни растения:
                </div>
                <div>
                    <label>
                        <input className='radio' type='radio' name='years' value="a1"/> Однолетник</label>
                    <label>
                        <input className='radio' type='radio' name='years' value="a2"
                               defaultChecked/> Многолетник</label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    Выращивание рассадой:
                </div>
                <div>
                    <input className='radio' type='radio' name='rootstock' value="a1" defaultChecked/> Обязательно
                    <input className='radio' type='radio' name='rootstock' value="a2"/> Необязательно
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