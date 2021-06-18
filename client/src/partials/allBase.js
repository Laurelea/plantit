import React from 'react'
import './../App.css';
import MainStore from "../stores/MainStore";
import { useTable } from "react-table";
import Reacttable from "./baseTable";
import { observer } from 'mobx-react';

const axios = require('axios').default;


// const getMyBase = () => {
//     axios({
//         method: 'get',
//         url: '/api/getbase',
//         // responseType: 'json'
//     })
//         .then((response) => {
//             console.log("get.response.data: ", response.data.rows);
//             // const dbToPrint = response.data.rows
//             // const myTable = Reacttable(dbToPrint)
//
//             MainStore.dbToPrint = response.data.rows
//             console.log("MainStore.dbToPrint allBase :", MainStore.dbToPrint)
//
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })}


export default class AllBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbToPrint: []
        };
        this.getMyBase = this.getMyBase.bind(this)

    }
    // getMyBase()
    // componentDidMount = () => {
    //     axios({
    //         method: 'get',
    //         url: '/api/getbase',
    //         // responseType: 'json'
    //     })
    //         .then((response) => {
    //             console.log("get.response.data: ", response.data.rows);
    //             // const dbToPrint = response.data.rows
    //             // const myTable = Reacttable(dbToPrint)
    //
    //             MainStore.dbToPrint = response.data.rows
    //             console.log("MainStore.dbToPrint allBase :", MainStore.dbToPrint)
    //
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    // }

    // myFunc = async() => {
    //     console.log("myFunc Inside myFunc:", MainStore.dbToPrint)
    //     const data = await observer (
    //         MainStore.dbToPrint
    //     )
    //     console.log("myFunc Inside myFunc:", data)
    //
    //     return (
    //         <Reacttable dbToPrint = {data}/>
    //     )
    //
    // }
    getMyBase = async () => {
        console.log("getMyBase: Inside getMyBase")
        await axios({
            method: 'get',
            url: '/api/getbase',
            // responseType: 'json'
        })
            // .then(async (response) => {
            //     console.log("getMyBase: get.response.data: ", response.data.rows);
            //     // const dbToPrint = response.data.rows
            //     // const myTable = Reacttable(dbToPrint)
            //
            //     // MainStore.dbToPrint = response.data.rows
            //     // console.log("getMyBase: MainStore.dbToPrint allBase :", MainStore.dbToPrint)
            //     await this.setState({
            //             dbToPrint: response.data.rows
            //         }
            //     )
            // })
            .then(response => this.setState({dbToPrint: response.data.rows}))
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    componentDidMount() {
        this.getMyBase();
    }

    render() {
        return (
            <div>

                {/*{this.myFunc()}*/}
                <div>Тут будет база</div>
                {/*{console.log("render: MainStore.dbToPrint from render:", MainStore.dbToPrint)}*/}
                {console.log("this.state.dbToPrint", this.state.dbToPrint)}
                <Reacttable dbToPrint={this.state.dbToPrint} />

            </div>
        )
    }
}
