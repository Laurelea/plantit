import React, {Component} from 'react';
import {observer} from 'mobx-react';
import MainStore from '../stores/MainStore';
import '../css/chat.css';

export default function Chat () {
    return (
        <React.Fragment>
        <div>Тут будет чат</div>
            <section>
                <div id="change_username">
                    <input id="username" type="text" />
                    <button id="send_username" type="button">Change username</button>
                </div>
            </section>
            <section id="chatroom">
                <section id="feedback"></section>
            </section>
            <ul id="messages"></ul>
            <section id="input_zone">
            <form id="form" action="">
                <input id="message" autoComplete="off" type="text"/>
                <button id="send_message" class="vertical-align" type="button">Send</button>
            </form>
            </section>
        </React.Fragment>
    )
}