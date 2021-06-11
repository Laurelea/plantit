// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Newheader from "./partials/Newheader";
import Seebase from "./partials/Seebase";
import Noauth from "./partials/no_auth";
import Auth from "./partials/auth";
import Footer from "./partials/footer";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import Addplant from "./partials/addPlant";
import Newuser from "./partials/newUser";

const axios = require('axios').default;

export default class App extends React.Component {
//Это хук, надо переписать без него, использовать класс:
//   const [data, setData] = React.useState(null);

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            pageTitle: "React Components",
            isAuthenticated: false
        };
        // this.componentDidMount = this.componentDidMount.bind(this);
        // this.axios = this.axios.bind(this);

    }


  componentDidMount = () => {
      axios({
          method: 'get',
          url: '/api',
          // responseType: 'json'
      })
          .then( (response) => {
              console.log("get.response.data: ", response.data);
              this.setState({
                  apiResponse: response.data.message,
                  pageTitle: response.data.title,
                  username: response.data.userName,
                  unqieID: response.data.uniqueID
              });
              document.title = this.state.pageTitle;
              console.log("this.state.pageTitle: ", this.state.pageTitle);
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
      // console.log("document.title: ", document.title)
      console.log("this.state.pageTitle: ", this.state.pageTitle)
  }
    render () {
    return (
        <div className="App">
            <div className="mainContainer">
                <Newheader/>
                <div id="bodyContainer" className="horizontal-align">
                    <div id="dbContainer" className="totheleft">
                        {/*Это показывать только если авторизован*/}
                        <Seebase/>
                        {/*Иначе текст: авторизуйтесь для доступа к базе растений*/}
                    </div>
                    <div id="centralContainer" className="center">
                        {/*Если не авторизован*/}
                        {/*Текст приветствия для неавторизованных, ссылка на регистрацию*/}
                        {/*<Noauth/>*/}
                        {/*Если авторизован*/}
                        {/*Текст, приглашающий посмотреть существующую базу или добавить что-то своё-->*/}
                        {/*<Hasauth/>*/}

                        {/*<Router>*/}
                            <Switch>
                                <Route path="/" exact render={() =>
                                    <React.Fragment>
                                        <h1>Home Page</h1>
                                        {/*<button onClick={this.goToHomePage}>Click</button>*/}
                                        <h2>{this.state.pageTitle}</h2>


                                    </React.Fragment>
                                }/>
                                <Route path="/addPlant" exact component={Addplant}/>
                                {/*        {Addplant}*/}
                                {/*</Route>*/}
                                <Route path="/newUser" exact component={Newuser}/>
                                <Route path="/auth/login" exact component={Noauth}/>
                                <Route path="/auth/logout" exact component={Noauth}/>
                                <Route render={() => <h2>404 not found</h2>}/>
                            </Switch>
                        {/*</Router>*/}
                        {/*<p>User Name is: {session.get("username")}</p>*/}
                        <p>User Name is: {this.state.username}</p>
                        <p>Message from API: {this.state.apiResponse}</p>

                    </div>
                    <div id="authContainer" className="totheright">
                        {/*Это показывать только если не авторизован*/}
                        <Auth/>
                        {/*Показывать если авторизован:*/}
                        {/*            Вы вошли как: username*/}
                        {/*            Какая-то статистика*/}
                        {/*            Выйти?*/}
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
}
// export default App;
