import React, {useEffect, useState} from 'react';
import '../css/App.css';
import Reacttable from "./baseTable";
import {API_URL} from "../config";
import {authorize, getBase, setMessage, smthAsync, unauthorize, updateBase} from "../store/actions";
import {connect} from "react-redux";
const axios = require('axios').default;

export const getMyBase = async () => {
    console.log("ALLBASE State empty");
    const response = await axios({
        method: 'get',
        url:    API_URL + 'api/getbase'
    })
        .catch(error => {
            console.log(error);
        })
    return response.data.rows
}

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
const AllBaseComponent = (props) => {
    useEffect(() => {
        props.updateBase();
    }, [])
    console.log('allbase props:', props)
    return (
        <div>
            {props.dbToPrint
                ?  <Reacttable dbToPrint={props.dbToPrint} columns = {columns}/>
                : null}
        </div>
    )
}

const VegsComponent = (props) => {
    console.log('vegs props:', props)
    useEffect(() => {
        props.updateBase();
    }, [])
    return (
        <div>
            <h2>Овощи</h2>
            { props.dbToPrint
                ?
                <Reacttable dbToPrint={ props.dbToPrint.filter(row => row.category === 'Vegs')} columns = {columns}/>
                : null }
        </div>
    )
}
const FruitComponent = (props) => {
    console.log('fruit props:', props)
    useEffect(() => {
        props.updateBase();
    }, [])
    return (
        <div>
            <h2>Фрукты</h2>
            { props.dbToPrint
                ?
                <Reacttable dbToPrint={ props.dbToPrint.filter(row => row.category === 'Fruit')} columns = {columns}/>
                : null }
        </div>
    )
}

const HerbsComponent = (props) => {
    console.log('herbs props:', props)
    useEffect(() => {
        props.updateBase();
    }, [])
    return (
        <div>
            <h2>Травы</h2>
            { props.dbToPrint
                ?
                <Reacttable dbToPrint={ props.dbToPrint.filter(row => row.category === 'Herbs')} columns = {columns}/>
                : null }
        </div>
    )
}

const DecsComponent = (props) => {
    console.log('decs props:', props)
    useEffect(() => {
        props.updateBase();
    }, [])
    return (
        <div>
            <h2>Цветы</h2>
            { props.dbToPrint
                ?
                <Reacttable dbToPrint={ props.dbToPrint.filter(row => row.category === 'Decs')} columns = {columns}/>
                : null }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dbToPrint: state.dbToPrint
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (userID, userName, userEmail, numberOfPlants) => dispatch(authorize(userID, userName, userEmail, numberOfPlants)),
        unauthorize: () => dispatch(unauthorize()),
        smthAsync: (userID, userName, userEmail, numberOfPlants) => dispatch(smthAsync(userID, userName, userEmail, numberOfPlants)),
        setMessage: message => dispatch(setMessage(message)),
        getBase: () => dispatch(getBase()),
        updateBase: () => dispatch(updateBase())
    }
}



const AllBase = connect(mapStateToProps, mapDispatchToProps)(AllBaseComponent);
const Vegs = connect(mapStateToProps, mapDispatchToProps)(VegsComponent);
const Fruit = connect(mapStateToProps, mapDispatchToProps)(FruitComponent);
const Herbs = connect(mapStateToProps, mapDispatchToProps)(HerbsComponent);
const Decs = connect(mapStateToProps, mapDispatchToProps)(DecsComponent);

export default AllBase

export { Vegs }
export { Fruit }
export { Herbs }
export { Decs }
