import React, { useLayoutEffect }  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';
import {API_URL} from "../config";
const axios = require('axios').default;

// const state = getMyBase()
// let data = [];

async function getMyBase () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
        console.log("ALLBASE State empty")
        // console.log("getMyBase: Inside getMyBase")
        await axios({
            method: 'get',
            url:    API_URL + 'api/getbase',
            // responseType: 'json'
        })
            .then(response => {
                    console.log("ALLBASE Got from DB:", response.data.rows)
                    // this.setState({dbToPrint: response.data.rows})
                    // return response.data.rows
                    // data = response.data.rows;
                    MainStore.dbToPrint = response.data.rows;

                }
            )
            .catch(error => {
                console.log(error);
            })
}

getMyBase()

const columns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Категория",
        accessor: "category",
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
const AllBase = observer(
    class AllBase extends React.Component {
        constructor(props) {
            super(props);
            // this.state = {
            //     data: MainStore.dbToPrint
            // }


            // getMyBase();

        }
        ref = React.createRef();


        // componentDidMount() {
        //     getMyBase();
        // }

        render() {

            return (
                <div ref={this.ref}>
                    <div>Тут будет база</div>
                    {console.log("ALLBASE: this.state.dbToPrint", MainStore.dbToPrint)}
                    <Reacttable dbToPrint={MainStore.dbToPrint} columns = {columns}/>

                </div>
            )
        }
    })

export default AllBase;

export {getMyBase};
