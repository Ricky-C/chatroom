window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById('name');
    var friendlist = document.getElementById('friendlist');

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
    field.onkeypress = function(event) {
        var key = event.keyCode;
        if (key == 13 || key.which == 13) {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value  });
            field.value = "";
            console.log('its working')
        };
    };


 
}


