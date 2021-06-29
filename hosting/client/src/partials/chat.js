import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import MainStore from '../stores/MainStore';
import '../css/chat.css';
import io from 'socket.io-client'

export default function Chat () {

    useEffect(() => {
        // let socket = io.connect("http://localhost:3003");
        let socket = io.connect("http://localhost:3003");
        let message = document.getElementById('message');
        let username = document.getElementById('username');
        let send_message = document.getElementById('send_message');
        let send_username = document.getElementById('send_username');
        let chatroom = document.getElementById('chatroom');
        let feedback = document.getElementById('feedback');
        // let name = document.getElementById('name');
        let random = Math.floor(Math.random() * (5));
        let alertClasses = ['secondary', 'danger', 'success', 'warning', 'info', 'light'];
        let alertClass = alertClasses[random];


        send_message.addEventListener("click",(event) => {
            socket.emit("new_message", {
                message: message.value,
                className: alertClass
            });
        });

        socket.on("add_message", data => {
            console.log(data);
            // feedback.innerHTML = "";
            message.value = "";
            const div = document.createElement('div');
            div.className = 'alert alert-' + data.className;
            div.innerHTML = '<b>' + data.username + "</b>: " + data.message;
            chatroom.append(div)
        });
        //Слушатель. Ждёт, когдат тыкнут кнопку "Сменить имя". См. стр.6 body.ejs
        send_username.addEventListener("click",(event) => {
            try {
                //Инициируется событие change-username, передаётся массив данных с поля, привязанного к кнопке id username:
                socket.emit("change_username", { username: username.value });
                alert('Success')
                document.getElementById("input_zone").hidden = false;
            } catch (e) {
                console.log(e)
            }
        });

        // message.bind("keypress", () => {
        //     socket.emit("typing");
        // });
        message.addEventListener('keypress', (event) => {
            console.log("Typing!" + event.target.value)
            socket.emit("typing");
            }
        );
        socket.on("typing", data => {
            console.log("Chat got typing event from server")
            feedback.innerHTML = "<p><i>" + data.username + " prints message..." + "</i></p>";
            // const div = document.createElement('div');
            // div.className = 'alert alert-' + data.className;
            // div.innerHTML = '<p><i>' + data.username + " prints message..." + "</i></p> ";
            // chatroom.append(div)
        });
        socket.on ("user_disconnected", data => {
            feedback.innerHTML = "<p>" + 'Total users now: ' + data.number + "</p>" +"<p><i>" + data.username + " disconnected" + "</i></p>";
        });

        socket.on("new", data => {
            feedback.innerHTML =
                "<p>" + 'Total users now: ' + data.number + "</p>" +
                "<p><i>" + data.username + " joined the Chat" + "</i></p>"
            console.log("Smth");
        });
    });
    return (
        <React.Fragment>
        <h3>Чат</h3>
            <section>
                <div id="change_username">
                    <input id="username" type="text" />
                    <button id="send_username" type="button">Enter your name:</button>
                </div>
            </section>
            <section id="chatroom">
                <section id="feedback"></section>
            </section>
            <ul id="messages"></ul>
            <section id="input_zone" hidden={true}>
                <form id="form" action="">
                    <input id="message" autoComplete="off" type="text" className="vertical-align" />
                    <button id="send_message" className="vertical-align" type="button">Send</button>
                </form>
            </section>
        </React.Fragment>
    )
}