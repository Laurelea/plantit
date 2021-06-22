import io from 'socket.io-client'

$(function() {
  // let socket = io.connect("http://localhost:3003");
  let socket = io("http://localhost:3003");
  let message = $("#message");
  let username = $("#username");
  let send_message = $("#send_message");
  let send_username = $("#send_username");
  let chatroom = $("#chatroom");
  let feedback = $("#feedback");
  let name = $("#name");
  let random = Math.floor(Math.random() * (5));
  let alertClasses = ['secondary', 'danger', 'success', 'warning', 'info', 'light'];
  let alertClass = alertClasses[random];


  send_message.click(() => {
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass
    });
  });

  socket.on("add_message", data => {
    console.log(data)
    feedback.html("");
    message.val("");
    chatroom.append(
      "<div class='alert alert-" +
        data.className +
        "'<b>" +
        data.username +
        "</b>: " +
        data.message +
        "</div>"
    );
  });
  //Слушатель. Ждёт, когдат тыкнут кнопку "Сменить имя". См. стр.6 body.ejs
  send_username.click(() => {
    //Инициируется событие change-username, передаётся массив данных с поля, привязанного к кнопке id username:
    socket.emit("change_username", { username: username.val() });
    alert('Success')
    document.getElementById("input_zone").hidden = false;

  });

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", data => {
    feedback.html(
      "<p><i>" + data.username + " prints message..." + "</i></p>"
    );
  });
  socket.on ("disconnect", data => {
    feedback.html(
        "<p>" + 'Total users now: ' + data.number + "</p>" +
        "<p><i>" + data.username + " disconnected" + "</i></p>"
    )
  })

  socket.on("new", data => {
    feedback.html(
        "<p>" + 'Total users now: ' + data.number + "</p>" +
        "<p><i>" + data.username + " joined the Chat" + "</i></p>"
    )
    console.log("Smth");
  });
});


