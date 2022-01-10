import React  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import MainStore from "../store/MainStore";
import { observer } from 'mobx-react';
import {API_URL} from "../config";

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

async function getHerbs () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
    // console.log("Herbs State empty")
    // console.log("getMyBase: Inside getMyBase")
    await axios({
        method: 'get',
        url: API_URL +'api/herbs',
        // responseType: 'json'
    })
        .then(response => {
                // console.log("Herbs Got from DB:", response.data.rows)
                // this.setState({dbToPrint: response.data.rows})
                // return response.data.rows
                // data = response.data.rows;
                MainStore.herbs = response.data.rows;
            }
        )
        .catch(error => {
            console.log(error);
        })
}

getHerbs()


const Herbs = observer(
    class Herbs extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <h2>Травы</h2>
                    {console.log("Herbs: this.state.herbs", MainStore.herbs)}
                    <Reacttable dbToPrint={MainStore.herbs} columns={columns}/>

                </div>
            )
        }
    })

export default Herbs;

export {getHerbs};
