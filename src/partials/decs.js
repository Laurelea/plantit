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

async function getDecs () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
    // console.log("Decs State empty")
    // console.log("getMyBase: Inside getMyBase")
    await axios({
        method: 'get',
        url: API_URL + 'api/decs',
        // responseType: 'json'
    })
        .then(response => {
                // console.log("Decs Got from DB:", response.data.rows)
                // this.setState({dbToPrint: response.data.rows})
                // return response.data.rows
                // data = response.data.rows;
                MainStore.decs = response.data.rows;
            }
        )
        .catch(error => {
            console.log(error);
        })
}

getDecs()


const Decs = observer(
    class Decs extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <h2>Декоративные</h2>
                    {console.log("Decs: this.state.decs", MainStore.decs)}
                    <Reacttable dbToPrint={MainStore.decs} columns={columns}/>

                </div>
            )
        }
    })

export default Decs;

export {getDecs};
