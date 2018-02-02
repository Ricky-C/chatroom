window.onload = function() {
 
	var messages = [];
	var connections = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById('name');
	var friendlist = document.getElementById('friendlist');
	var login = document.getElementById('login');
	var logout = document.getElementById('logout');
	
	
	var usersonline = document.getElementById('usersonline');
	

	

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
	
	socket.on('add', function(data) {
		addUser(data);
	})

	socket.on('get users', function(data) {
		var html = '';
		for(i= 0;i < data.length;i++) {
			html += '<li id="usersonline">' + data[i] + '</li>';
		}
		usersonline.innerHTML = html;
	})
	
	
	 

 /*
	Click and Key Events
*/
	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text, username: name.value  });

		field.value = "";
		console.log('hello');
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


	



	
	login.onclick = function() {
		
		var text= name.value;
		
		socket.emit('add', text, function(data) {

			text;
		});
		socket.emit('get users', function(data) {
			text;
		});
		

		
	
		$(this).prop('disabled', true);
		$(name).prop('disabled', true);
		$(logout).prop('disabled', false);
		$(field).prop('disabled', false);
		console.log('hey');
		
	};
	
	name.onkeypress = function(event) {
		var key = event.keyCode;
		if (key.which == 13 && key.shiftKey == false) {
			friendlist.innerHTML += name.value;
	
			$(login).prop('disabled', true);
			$(this).prop('disabled', true);
			$(logout).prop('disabled', false);
			$(field).prop('disabled', false);
		};
	};


	logout.onclick = function() {
		name.value = '';
		
		var text = name.value;
		socket.emit('disconnect', text, function(data) {
			text;
		});
		socket.emit('get users', text, function(data) {
			text;
		});
		//friendlist.innerHTML = '';

		$(login).prop('disabled', false);
		$(name).prop('disabled', false);
		$(this).prop('disabled', true);
		$(field).prop('disabled', true);
		
	}
 

 	
}


	