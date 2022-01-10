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

async function getVegs () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
    // console.log("Vegs State empty")
    // console.log("getMyBase: Inside getMyBase")
    await axios({
        method: 'get',
        url: API_URL + 'api/vegs',
        // responseType: 'json'
    })
        .then(response => {
                // console.log("Vegs Got from DB:", response.data.rows)
                // this.setState({dbToPrint: response.data.rows})
                // return response.data.rows
                // data = response.data.rows;
                MainStore.vegs = response.data.rows;
            }
        )
        .catch(error => {
            console.log(error);
        })
}

getVegs()


const Vegs = observer(
    class Vegs extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <h2>Овощи</h2>
                    {console.log("Vegs: this.state.vegs", MainStore.vegs)}
                    <Reacttable dbToPrint={MainStore.vegs} columns={columns}/>

                </div>
            )
        }
    })

export default Vegs;

export {getVegs};
