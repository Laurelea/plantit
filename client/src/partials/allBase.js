import React, { useLayoutEffect }  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';

const axios = require('axios').default;

// const state = getMyBase()
let data = [];

async function getMyBase () {
    // console.log(state.dbToPrint.length)
    // if (state.dbToPrint.length == 0) {
        console.log("ALLBASE State empty")
        // console.log("getMyBase: Inside getMyBase")
        await axios({
            method: 'get',
            url: '/api/getbase',
            // responseType: 'json'
        })
            .then(response => {
                    console.log("ALLBASE Got from DB:", response.data.rows)
                    // this.setState({dbToPrint: response.data.rows})
                    // return response.data.rows
                    data = response.data.rows;
                    // MainStore.dbToPrint = response.data.rows;

                }
            )
            .catch(error => {
                console.log(error);
            })
}

getMyBase()


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
                    {console.log("ALLBASE: this.state.dbToPrint", data)}
                    <Reacttable dbToPrint={data}/>

                </div>
            )
        }
    })

export default AllBase;