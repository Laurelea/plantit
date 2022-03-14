import React, {ChangeEvent, useState} from 'react'
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

interface ICatState {
    pic: File | undefined,
    error: string | undefined,
    preview: string | undefined,
    pic_name: string,
}

const AddCat = (props: IAddCatProps) => {
    const [state, setState] = useState<ICatState>({
        pic: undefined,
        preview: undefined,
        error: undefined,
        pic_name: '',
    })
    const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const img = e.currentTarget.files[0];
            const splitFileName = img.name.split('.');
            const extension = splitFileName[splitFileName.length - 1].toLowerCase();
            if (!['jpg', 'jpeg', 'bmp', 'png'].includes(extension)) {
                window.alert('supported file extension only jpg/jpeg/bmp/png')
                // setState({
                //     ...state,
                //     error: 'supported file extension only jpg/jpeg/bmp/png'
                // });
                return;
            } else {
                setState({
                    ...state,
                    pic: img,
                    pic_name: splitFileName[0].toLowerCase(),
                    preview: URL.createObjectURL(img)
                });
            }
        }
    }
    const addCatHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!state.pic) {
            window.alert('no picture selected')
            // setState({
            //     ...state,
            //     error: 'no picture selected',
            // })
            return;
        }
        const formData = new FormData();
        formData.append('0', state.pic);
        await axios.post(API_URL + 'api/saveCatPic', { pic: formData, pic_name: state.pic_name })
            .then(async(response) => {
                console.log('66 saveCatPic response', response);
                const catData = {
                    category: event.currentTarget.category.value,
                    cat_desc: event.currentTarget.desc.value,
                    cat_pic: response.data.link,
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
            {/*<input type='text' placeholder='Ссылка на картинку' name='pic' required autoComplete="on" className='whole-line add-input'/>*/}
            <div className='add-photo'>
                <p>Добавить картинку категории:</p>
                <input type="file"  accept="image/*" name="pic" className='add-input file' onChange={imageChange}/>
                <img id="myImg" src={state.preview} alt='cat_pic' width='150px'/>
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
}), { updateBase, updateUserInfo, updateCats })(AddCat);
