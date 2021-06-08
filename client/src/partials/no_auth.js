import React from 'react'
import './../App.css';

export default function Noauth(props) {
    return (
        <React.Fragment>
        <h2>Вы не авторизованы</h2>
        <div> Пожалуйста, авторизуйтесь в форме справа </div>
        </React.Fragment>
    )
}