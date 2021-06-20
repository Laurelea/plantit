import React from 'react'
import '../css/App.css';
import MainStore from "../stores/MainStore";
import { useTable } from "react-table";
import Reacttable from "./baseTable";

const axios = require('axios').default;

// const state = getMyBase()
let data = [];

async function getMyBase () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
        console.log("State empty")
        // console.log("getMyBase: Inside getMyBase")
        // let toPrint;
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
            .then(response => {
                    console.log("Got from DB:", response.data.rows)
                    // this.setState({dbToPrint: response.data.rows})
                    // return response.data.rows
                    // return response.data.rows;
                    data = response.data.rows;
                }
            )
            .catch(error => {
                // handle error
                console.log(error);
            })
    // return toPrint
    // } else {
    //     console.log("State full")
    // }

}

getMyBase()



export default class AllBase extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dbToPrint: []
    //     };
    //     // this.getMyBase = this.getMyBase.bind(this)
    //     // this.getMyBase();
    //
    // }


    // componentDidMount() {
    //     getMyBase();
    // }

    render() {
        return (
            <div>

                {/*{this.myFunc()}*/}
                <div>Тут будет база</div>
                {/*{console.log("render: MainStore.dbToPrint from render:", MainStore.dbToPrint)}*/}
                {console.log("this.state.dbToPrint", data)}
                <Reacttable dbToPrint={data} />

            </div>
        )
    }
}
