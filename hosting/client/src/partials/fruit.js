import React  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';

const axios = require('axios').default;
const columns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Растение",
        accessor: "product_name",
    },
    {
        Header: "Сорт",
        accessor: "name",
    },
    {
        Header: "Производитель",
        accessor: "producer_name",
    }
    ,
    {
        Header: "Добавил",
        accessor: "user_name",
    }
];

async function getFruit () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
    // console.log("Fruit State empty")
    // console.log("getMyBase: Inside getMyBase")
    await axios({
        method: 'get',
        url: '/api/fruit',
        // responseType: 'json'
    })
        .then(response => {
                console.log("Fruit Got from DB:", response.data.rows)
                // this.setState({dbToPrint: response.data.rows})
                // return response.data.rows
                // data = response.data.rows;
                MainStore.fruit = response.data.rows;
            }
        )
        .catch(error => {
            console.log(error);
        })
}

getFruit()


const Fruit = observer(
    class Fruit extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <h2>Фрукты</h2>
                    {/*{console.log("Fruit: this.state.fruit", MainStore.fruit)}*/}
                    <Reacttable dbToPrint={MainStore.fruit} columns={columns}/>

                </div>
            )
        }
    })

export default Fruit;

export {getFruit};
