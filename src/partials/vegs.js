import React  from 'react'
import '../css/App.css';
import Reacttable from "./baseTable";
import { getBase, updateBase} from "../store/actions";
import {connect} from "react-redux";

const columns = require('./allBase')

const Vegs = (props) => {
    console.log('vegs props:', props)
    // call getBase for update
    return (
            <div>
                <h2>Овощи</h2>
                { props.dbToPrint
                    ?
                    <Reacttable dbToPrint={props.dbToPrint.filter(row => row.category === 'Vegs')} columns = {columns}/>
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
        getBase: () => dispatch(getBase()),
        updateBase: () => dispatch(updateBase())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vegs);
