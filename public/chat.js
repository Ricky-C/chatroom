window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById('name');

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            console.log('all the messages', messages);
            var html = '';
            for (var i=0; i < messages.length; i++) {
                var username = "Server";
                if(messages[i].username) {
                    username = messages[i].username;
                }

                html += '<b>' + username + ': </b>';
                html += messages[i].message + '<br />';
            }

            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value  });
        field.value = "";
    };
 
}


