import { API_URL } from "../config";

const axios = require('axios').default;

const CookiesDelete = () => {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

interface ILogoutResponse {
    data: {
        isAuthenticated: boolean;
    }
}

const Logout = async() => {
    await axios({
        method: 'post',
        url: `${API_URL}/logout`
    })
        .then( (response: ILogoutResponse) => {
            CookiesDelete()
            console.log("Logout get.response.data: ", response.data);
        })
        .catch((error: any) => {
            console.log("32 Logout error:", error);
        })
}

export default Logout
