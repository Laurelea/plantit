import React, { useState} from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { updateBase, updateCats } from "../store/actions";
import { ICat, IReduxState, IUser } from "../store/types";
import { API_URL } from "../config";
import FormData from 'form-data';

interface IAddCatProps {
    currentUser: IUser,
    // updateUserInfo: (numberOfPlants: number) => void,
    updateBase: () => void,
    updateCats: () => void,
    cats: Array<ICat> | undefined,
}

interface ICatState {
    pic: File | undefined,
    error: string | undefined,
    preview: string | undefined,
}

const AddCat = (props: IAddCatProps) => {
    // console.log(props)
    const [state, setState] = useState<ICatState>({
        pic: undefined,
        preview: undefined,
        error: undefined,
    })
    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('41 imageChange', e);
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const img = e.currentTarget.files[0];
            const splitFileName = img.name.split('.');
            const extension = splitFileName[splitFileName.length - 1].toLowerCase();
            if (!['jpg', 'jpeg', 'bmp', 'png'].includes(extension)) {
                window.alert('supported file extension only jpg/jpeg/bmp/png')
                return;
            } else {
                console.log('54 imageChange')
                setState({
                    ...state,
                    pic: img,
                    preview: URL.createObjectURL(img)
                });
            }
        }
    }
    const addCatHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!state.pic) {
            window.alert('no picture selected')
            return;
        }
        const formData = new FormData();
        formData.append('pic', state.pic);
        formData.append('cat_desc', event.currentTarget.desc.value);
        formData.append('category', event.currentTarget.category.value);
        event.currentTarget.reset();
        await axios.post(`${API_URL}/addCat`, formData, {
            headers: {
                ...formData.getHeaders
            },
        })
            .then(async response => {
                console.log('77 addcat response.data.success from router', response.data.success)
                if (response.data.success) {
                    console.log('triggering updateCats...')
                    props.updateCats();
                } else {
                    window.alert(response.data.message)
                }
                setState({
                    pic: undefined,
                    preview: undefined,
                    error: undefined,
                })
            })
            .catch(err => {
                console.log('err making new cat:', err)
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
            <div className='add-photo'>
                <p>Добавить картинку категории:</p>
                <input type="file"  accept="image/*" name="pic" className='add-input file' onChange={imageChange}/>
                <img id="myImg" src={state.preview} alt='' width='150px'/>
            </div>
            <div className='whole-line'>
                <button type='submit' className='add-button'>Добавить</button>
            </div>
        </form>
    )
}

export default connect((state: IReduxState) => ({
    currentUser: state.currentUser,
    cats: state.cats,
}), { updateBase, updateCats })(AddCat);
