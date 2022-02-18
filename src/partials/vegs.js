import React  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import {API_URL} from "../config";
import {authorize, getBase, setMessage, smthAsync, unauthorize, updateBase} from "../store/actions";
import {connect} from "react-redux";

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

export const getVegs = async () => {
    console.log('get vegs run')
    const response = await axios({
        method: 'get',
        url: API_URL + 'api/vegs',
    })
        .then(response => {
                console.log('vegs response:', response.data.rows);
            }
        )
        .catch(error => {
            console.log(error);
        })
    return response.data.rows
}

const Vegs = (props) => {
    console.log('vegs props:', props)
    getVegs()
    // props.getVegs();
    return (
            <div>
                <h2>Овощи</h2>
                { props.dbToPrint
                    ?
                    <Reacttable dbToPrint={props.dbToPrint.filter(row => row.category === 'Vegs')} columns = {columns}/>
                    : null }
                {/*<Reacttable dbToPrint={props.vegs} columns={columns}/>*/}
            </div>
        )
}


const mapStateToProps = (state) => {
    return {
        dbToPrint: state.dbToPrint,
        vegs: state.vegs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (userID, userName, userEmail, numberOfPlants) => dispatch(authorize(userID, userName, userEmail, numberOfPlants)),
        unauthorize: () => dispatch(unauthorize()),
        smthAsync: (userID, userName, userEmail, numberOfPlants) => dispatch(smthAsync(userID, userName, userEmail, numberOfPlants)),
        setMessage: message => dispatch(setMessage(message)),
        getBase: () => dispatch(getBase()),
        updateBase: () => dispatch(updateBase()),
        getVegs: () => dispatch(getVegs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vegs);
