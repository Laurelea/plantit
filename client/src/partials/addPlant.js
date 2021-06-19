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
        const test = event.target.elements.years.value
        console.log(test)
    //     const test = []
    //     const getElementsWithDepth = (el, level = 0) =>
    //         [...el.children].reduce((acc, n) => {
    //             acc.push(...getElementsWithDepth(n, level + 1));
    //             return acc;
    //         }, [ { el, level } ]);
    //     // console.log(getElementsWithDepth(event.target))
    //     function handleform (){
    //         for (const elem of getElementsWithDepth(event.target)) {
    //             if (elem.el.name && elem.el.value) {
    //                 console.log(elem.el.name, elem.el.value)
    //             }
    //         }
    //
    // }

        // handleform()
        // console.log("event.target", event.target.childNodes)
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
                <option value="Herbs" selected={true}>Травы</option>
                <option value="Fruit">Фрукты</option>
                <option value="Vegs">Овощи</option>
                <option value="Decs">Декоративное</option>
            </select>
            <fieldset>
                <input type='text' placeholder='Название сорта' autoFocus name='sort' required autoComplete="off" value = "Тест"/>

                <input type='text' placeholder='Название типа' name='type' required autoComplete="on" value = "Тест"/>

                <input type='text' placeholder='Производитель' name='producer' required autoComplete="on" value = "Тест"/>
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
                               checked={true}/> Многолетник</label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    Выращивание рассадой:
                </div>
                <div>
                    <input className='radio' type='radio' name='rootstock' value="a1" /> Обязательно
                    <input className='radio' type='radio' name='rootstock' value="a2" checked/> Необязательно
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