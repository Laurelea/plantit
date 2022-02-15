import React, {useEffect, useState} from 'react';
import '../css/App.css';
import Reacttable from "./baseTable";
import {API_URL} from "../config";
import {authorize, getBase, setMessage, smthAsync, unauthorize, updateBase} from "../store/actions";
import {connect} from "react-redux";
const axios = require('axios').default;

export const getMyBase = async() => {
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
const AllBase = (props) => {
    useEffect(() => {
        props.updateBase();
    })
    console.log('allbase props:', props)
    return (
        <div>
            {props.dbToPrint
            ?  <Reacttable dbToPrint={props.dbToPrint} columns = {columns}/>
            : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllBase);
