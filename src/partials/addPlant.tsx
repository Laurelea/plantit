import React from 'react'
import '../css/App.css';
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateUserInfo } from "../store/actions";
import { IReduxState, IUser } from "../store/types";

// authorize: (userID: number, userName: string, userEmail: string, numberOfPlants: number) => IAuthorizeAction

interface IAddPlantProps {
    currentUser: IUser,
    updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void
}

const addPlant = (props: IAddPlantProps) => {
    const updateNumberOfPlants = async() => {
        const data = {id: props.currentUser.userID}
        await axios.post('/api/getNumberOfPlants', data)
            .then(response => {
                    console.log("LK Got Plants: response.data: ", response.data)
                    props.updateUserInfo(response.data);
                }
            )
            .catch(error => {
                console.log("updateNumberOfPlants error: ", error);
            })
    }
    const addPlantHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.currentTarget.reset();
        event.preventDefault();
        const plantData = {
            category: event.currentTarget.category.value,
            plantSort: event.currentTarget.plantSort.value,
            product : event.currentTarget.product.value,
            producer : event.currentTarget.producer.value,
            yeartype : (event.currentTarget.yeartype.value == "a1") ? "однолетник" : "многолетник",
            rootstock : !!event.currentTarget.rootstock.value,
            watering : event.currentTarget.watering.value,
            soil: event.currentTarget.soil.value,
            user_id: props.currentUser.userID
        }
        console.log("plantData to send to server:", plantData)
        await axios.post('/api/addplant', plantData)
            .then(response => {
                props.updateBase();
                updateNumberOfPlants();
                console.log("post.response.data: ", response.data);
                if (response.data.command == "INSERT") {
                    console.log("added ok")
                    window.alert("added ok")
                    // result = "Plant added successfully"
                } else {
                    console.log("Error addplant: " + response.data)
                    window.alert("error ((")
                    // result = response.data.error
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }
    return (
        <form name='Форма для добавления нового растения' id='MyAddForm' onSubmit={addPlantHandler}
              autoComplete="on">
            {/*<span className="errorspan">{result}</span>*/}
            <h2 id="testBD">
                Добавить новое растение
            </h2>
            <label><p>Выберите категорию:</p></label>
            <select name="category" required>
                <option value="Herbs">Травы</option>
                {/*<option value="Herbs" selected={false}></option>*/}
                <option value="Fruit">Фрукты</option>
                <option value="Vegs">Овощи</option>
                <option value="Decs">Декоративное</option>
            </select>
            <fieldset>
                <input type='text' placeholder='Род растения: кабачок, томат, клубника и тп.' name='product' required autoComplete="on"
                       defaultValue={""}/>
                <input type='text' placeholder='Сорт растения: Машенька, Гигант, Роузи и тп.' autoFocus name='plantSort' required
                       autoComplete="off" defaultValue={""}/>
                <input type='text' placeholder='Производитель семян' name='producer' required autoComplete="on"
                       defaultValue={""}/>
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
                    <input className='radio' type='radio' name='rootstock' value="a1"/> Обязательно
                    <input className='radio' type='radio' name='rootstock' value="a2"
                           defaultChecked={false}/> Необязательно
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

export default connect((state: IReduxState) => ({
    currentUser: state.currentUser,
}), { updateBase, updateUserInfo })(addPlant);
