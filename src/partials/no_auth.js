import React from 'react'
import {API_URL} from "../config";
// import {connect} from "react-redux";
// import {setMessage, smthAsync, unauthorize} from "../store/actions";

const axios = require('axios').default;

function CookiesDelete() {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

const Logout = async() => {
    await axios({
        method: 'post',
        url: API_URL + 'api/logout'
    })
        .then( (response) => {
            CookiesDelete()
            console.log("Logout get.response.data: ", response.data);
            // props.unauthorize();
            console.log("document.cookie: ", document.cookie);
        })
        .catch(function (error) {
            console.log("No_auth error:", error);
        })
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         unauthorize: () => dispatch(unauthorize()),
//         smthAsync: (userID, userName, userEmail, numberOfPlants) => dispatch(smthAsync(userID, userName, userEmail, numberOfPlants)),
//         setMessage: message => dispatch(setMessage(message))
//     }
// }

// export default connect({}, mapDispatchToProps)(Logout);

export default Logout
