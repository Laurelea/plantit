import React from 'react'
import '../css/App.css';
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';

const axios = require('axios').default;

const Noauth = observer (
    class Noauth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            // pageTitle: "React Components",
            isAuthenticated: MainStore.isAuthenticated
        };
    }
    CookiesDelete = () => {

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
        // }
    }

    componentDidMount = () => {
        // console.log("MainStore.isAuthenticated:  " , this.state.isAuthenticated)
        axios({
            method: 'post',
            url: '/api/logout',
            // responseType: 'json'
        })
            .then( (response) => {
                this.CookiesDelete()
                console.log("get.response.data: ", response.data);
                this.setState({
                    apiResponse: "You're logged out",
                });
                MainStore.dropUser();
                // console.log("MainStore.currentUser.userName", MainStore.currentUser.userName)
                MainStore.isAuthenticated = response.data.isAuthenticated
                // document.deleteCookie('SID')
                console.log("this.state.userName NO_AUTH: ", this.state.userName);
                // document.cookie = 'COOKIE_NAME=SID; Max-Age=0; path=/;';
                console.log("document.cookie: ", document.cookie);


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    render() {
        return (
            // window.location.replace("/")

            <React.Fragment>
                <h2>You logged out</h2>
                <div> Пожалуйста, авторизуйтесь в форме справа</div>
            </React.Fragment>

        )
    }
})
export default Noauth