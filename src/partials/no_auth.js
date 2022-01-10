import React from 'react'
import '../css/App.css';
import MainStore from "../store/MainStore";
import {API_URL} from "../config";

const axios = require('axios').default;


function CookiesDelete() {
    const cookies = document.cookie.split(";");
    // console.log("cookies", cookies)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // console.log("name: ", name)
        // if (name === "SID") {
        //     console.log("name from if: ", name)
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default async function Logout () {
    await axios({
        method: 'post',
        url: API_URL + 'api/logout',
        // responseType: 'json'
    })
        .then( (response) => {
            CookiesDelete()
            console.log("Logout get.response.data: ", response.data);
            // this.setState({
            //     apiResponse: "You're logged out",
            // });
            MainStore.dropUser();
            // console.log("MainStore.currentUser.userName", MainStore.currentUser.userName)
            MainStore.isAuthenticated = response.data.isAuthenticated
            // document.deleteCookie('SID')
            // console.log("this.state.userName NO_AUTH: ", this.state.userName);
            // document.cookie = 'COOKIE_NAME=SID; Max-Age=0; path=/;';
            console.log("document.cookie: ", document.cookie);


        })
        .catch(function (error) {
            // handle error
            console.log("No_auth error:", error);
        })
}



