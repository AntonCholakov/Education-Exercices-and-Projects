var serviceUrl = "http://cryptochat.apphb.com/CryptoChatService.svc/"

$.support.cors = true; // support for IE

// Declare an object with logged user information
var loggedUser = {
	name: '',
	sessionID: '',
	sentKey: '',
	recieveKey: '',
	interval: '', // used for getting server messages
	logTimeout: ''
};
// Declare an object with messages recieved from server
var messageServerData = {
	msgType: '',
	msgText: '',
	username: '',
	challengeKey: '',
	randomNumber: '',
	response: '' // to invitation
}

function onDocumentReady() {
	
	creatingLoginRegBoxes();
	
	document.getElementById("reg-btn").onclick=onRegBtnClick;
	document.getElementById("log-btn").onclick=onLogBtnClick;
	
}

function startTimer() {
	clearTimeout(loggedUser.logTimeout); // restarting the timer
	loggedUser.logTimeout = setTimeout(onLogoutBtnClick, 300000); // set the timer - 5 mins
}

function creatingLoginRegBoxes() {
	// Login box show
	$("#login-button").toggle ( 
		function(ev) {
			ev.preventDefault();
			$("#login").show(800);
		},
		function(ev) {
			ev.preventDefault();
			$("#login").hide(800);
		}
	);

	// Reg box show
	$("#reg-button").toggle ( 
		function(ev) {
			ev.preventDefault();
			$("#reg").show(800);
		},
		function(ev) {
			ev.preventDefault();
			$("#reg").hide(800);
		}
	);
	
}

function createMainContent() {

	//Removing Login and Register buttons and adding Logout button
	$("#login-reg").html('<span>' +
		'Hello ' + 
		loggedUser.name +
		'</span>' + 
		'<a href="#" id="logout-btn">Logout</a>')

	// Generating the Online users part
	$("#main-part").html(
		'<aside id="who-is-online">' +
				
			'<div class="box-label">Online</div>' +
			
			'<div class="main-box-part">' +
				
			'</div>' +
			
		'</aside>'
	);
	
	document.getElementById("logout-btn").onclick=onLogoutBtnClick; // handling logout function

}

function onRegBtnClick(e) {
   
	var name = $("#reg-name").val();
	var pass = $("#reg-password").val();
	
	var userValidation = /^[\w\.-]{4,30}$/; // creating pattern for username
	var passValidation = /^[\w\.-]{6,22}$/; // creating pattern for password
	
	var validUsername = name.match(userValidation); // check if the username is validated
	var validPassword = pass.match(passValidation); // check if the password is validated

	if (!(validUsername)) {
		alert("Username should be between 4 and 30 characters")
	}
	else if (!(validPassword)) {
		alert("Password should be between 6 and 20 characters")
	}
	else {
		var sum = "" + name + pass;
		var hash = CryptoJS.SHA1(sum); // cripting datas from the users
		hash = hash.toString(CryptoJS.enc.Hex);
	 
		var body = {
			username: name,
			authCode: hash
		};

		performPostRequest(
			serviceUrl + "register",
			body,
			function (data) {	
				// saving the name and sessionID at the global object
				loggedUser.name = name;
				loggedUser.sessionID = data.sessionID;
				loggedUser.interval = setInterval(recieveMessageFromServer, 2000); // function for getting server messages
				createMainContent();
				getOnlineUsers();
				startTimer(); // starting a timer (5 minutes) for session
			},
			onError
		);  
		return false;
	}
}

function onLogBtnClick() {
	var name = $("#log-name").val();
	var pass = $("#log-password").val();
	var userValidation = /^[\w\.-]{4,30}$/; // creating pattern for username
	var passValidation = /^[\w\.-]{6,22}$/; // creating pattern for password
	
	var validUsername = name.match(userValidation); // check if the username is validated
	var validPassword = pass.match(passValidation); // check if the password is validated

	if (!(validUsername)) {
		alert("Username should be between 4 and 30 characters")
	}
	else if (!(validPassword)) {
		alert("Password should be between 6 and 20 characters")
	}
	else {
		var sum = "" + name + pass;
		var hash = CryptoJS.SHA1(sum);
		hash = hash.toString(CryptoJS.enc.Hex);
	 
		var body = {
			username: name,
			authCode: hash.toString()
		};

		performPostRequest(
			serviceUrl + "login",
			body,
			function (data) {
				loggedUser.name = name;
				loggedUser.sessionID = data.sessionID;
				createMainContent();
				getOnlineUsers();
				loggedUser.interval = setInterval(recieveMessageFromServer, 2000); // function for getting server messages
				startTimer(); // starting a timer (5 minutes) for session
			},
			onError
		);  
		return false;
	}
}

function onLogoutBtnClick() {

	performGetRequest(
		serviceUrl + "logout/" + loggedUser.sessionID,
		function() {
			creatingIndex(); // creating the first 'screen' of the index
			clearInterval(loggedUser.interval); // stop recieving messages from server
		},
		onError
	);
	
}

function creatingIndex() {

	$("#main-part").html(
		'<p>Welcome to the new chat!</p>' +
		'<p>You should make an account or login to chat!</p>' +
		'<div id="arrow"></div>'
	);
	$("#login-reg").empty();
	$("#login-reg").html(
		'<a href="#" id="login-button" style="margin-right: 4px">Login</a>' +

		'<a href="#" id="reg-button">Registration</a>' +
		
		'<div class="log-reg-box" id="login">' +
			'<form>' +
			
				'<label for="log-name">Name:</label><br>' +
				'<input type="text" id="log-name" required="required" /><br>' +
			
				'<label for="log-password">Password:</label><br>' +
				'<input type="password" id="log-password" required="required" />' +
			
				'<input type="submit" id="log-btn" value="Login" />' +
				
			'</form>' +
		'</div>' +
		
		'<div class="log-reg-box" id="reg">' +
			'<form>' +
			
				'<label for="reg-name">Name:</label><br>' +
				'<input type="text" id="reg-name" required="required" /><br>' +
			
				'<label for="reg-password">Password:</label><br>' +
				'<input type="password" id="reg-password" required="required" />' +
			
				'<input type="submit" id="reg-btn" value="Registration" />' +
				
			'</form>' +
		'</div>'
	);
	
	creatingLoginRegBoxes(); // handling functions for log and reg boxes
	
	document.getElementById("reg-btn").onclick=onRegBtnClick;
	document.getElementById("log-btn").onclick=onLogBtnClick;
}

function getOnlineUsers() {
	
	performGetRequest(
		serviceUrl + "list-users/" + loggedUser.sessionID,
		function(data) {
		
			$("#who-is-online .box-label").html(data.length + " users online");
			
			var onlineUsers = '<ul id="users-list">'
			for (var i = 0; i < data.length; i++) {
				onlineUsers +=
				'<li class="user"><a href="#">' +
					data[i] +
				'</a></li>'
			}

			onlineUsers += '</ul>';
					
			$("#who-is-online .main-box-part").append(onlineUsers);

			$("#users-list li a").on("click", showInvitationBox);
			
		},
		onError
	);
	
}

function showInvitationBox() {

	$("#server-message-central").html('<div id="invitation"><div id="descr">Type your secret Key here:</div><input type="password" id="input-send-key" /><input type="submit" id="submit-send-key" value="Ok" /><div id="cancel-button3"></div></div>');
	document.getElementById("cancel-button3").onclick=function() { $("#server-message-central-holder").fadeOut(800) };
	
	$("#server-message-central-holder").show(800);

	var username = $(this).html(); // get the user you want to invite
	messageServerData.username = username; // saving the username so as to be used in other requests
	
	document.getElementById("submit-send-key").onclick=inviteUser;	
}


function inviteUser() {
	
	var secretKey = $("#input-send-key").val(); // get the secret key of the users
	loggedUser.sentKey = secretKey; // saving the secret key so as to be used in other requests
	
	var randomNumber = Math.floor(Math.random() * 1000000000); // generating random number in interval 0 to 999 999 999
	messageServerData.randomNumber = randomNumber;
	
	var challengeKey = GibberishAES.enc(randomNumber , secretKey); // cripting challenge key for invitation
	messageServerData.challengeKey = challengeKey;
	
	var body = {
		sessionID: loggedUser.sessionID,
		recipientUsername: messageServerData.username,
		challenge: challengeKey
	}

	performPostRequest(
		serviceUrl + "invite-user",
		body,
		function () {
			alert("Invitation was sent!");
			startTimer();
			$("#server-message-central-holder").hide(800);
		},
		onError
	);
	
}

function recieveMessageFromServer() {

	performGetRequest(
	
		serviceUrl + "get-next-message/" + loggedUser.sessionID,
		function (data) {
			// when a user logged in (is online)
			if (data.msgType == "MSG_USER_ONLINE" && data.username != "null") {
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:blue">' + data.username + ' is online</div>');
				$("#who-is-online .main-box-part").empty();
				getOnlineUsers();
				$("#server-message-holder").delay(5000).fadeOut(800);
			}
			// when a user logged out (is offline)
			else if(data.msgType == "MSG_USER_OFFLINE") {
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:red">' + data.username + ' is offline</div>');
					
					// remove bugs when user log out
					
					if(data.username == messageServerData.username) {
						
						createMainContent();
						alert("Chat closed! Your friend is offline");
					}
					
				$("#who-is-online .main-box-part").empty();
				getOnlineUsers();
				$("#server-message-holder").delay(5000).fadeOut(800);
			}
			// chat invitation
			else if(data.msgType == "MSG_CHALLENGE") {
				
				//saving challengeKey and username in the global object to use them in the next functions
				messageServerData.challengeKey = data.msgText;
				messageServerData.username = data.username;
				
				$("#server-message-central").html('<div id="invitation"><div id="descr">You have an invitation from ' +
					messageServerData.username +
					'</div><input type="password" id="input-recieve-key" /><input type="submit" id="submit-recieve-key" value="Ok" /><div id="cancel-button3"></div></div>');
				
				document.getElementById("cancel-button3").onclick=cancelChat; // handling cancel function to the cancel button
				document.getElementById("submit-recieve-key").onclick=answerInvitation;
				
				$("#server-message-central-holder").show(800);		
				
			}
			// response chat invitation
			else if(data.msgType == "MSG_RESPONSE") {
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:black">' + data.username + ' is responsing invitation</div>');
				
				//saving response and username in the global object to use them in the next functions
				messageServerData.response = data.msgText;
				messageServerData.username = data.username;		
				startChat();
				
				$("#server-message-holder").delay(5000).fadeOut(800);
			}
			// start chat
			else if(data.msgType == "MSG_START_CHAT") {
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:black">You started chat with ' + data.username + '</div>');
				$("#server-message-holder").delay(5000).fadeOut(800);
			}
			// cancel a chat
			else if(data.msgType == "MSG_CANCEL_CHAT") {
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:black">' + data.username + ' canceled chat with you</div>');
				$("#server-message-holder").delay(5000).fadeOut(800);
				
				createMainContent();
				getOnlineUsers();	
			}
			// recieve a message
			else if (data.msgType == "MSG_CHAT_MESSAGE") {
				
				var msg = data.msgText; // encripted message from the server

				var decriptedMsg = GibberishAES.dec(msg, loggedUser.recieveKey || loggedUser.sentKey); // decripting recieved from server message

				$("#message-part").prepend(
				"<div class='others-message'>" +
					"<div class='text'>" +
						decriptedMsg +
					"</div>" +
				"</div>")
				
				startTimer();
				
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:black">You have a chat message from ' + data.username + '</div>');
				$("#server-message-holder").delay(5000).fadeOut(800);

			}

		},
		onError
	); 

}

function answerInvitation() {
	
	var username = messageServerData.username;
	var challengeKey = messageServerData.challengeKey;
	
	var keyResponse = $("#input-recieve-key").val();

	loggedUser.recieveKey = keyResponse;
	
	// Check if the challenge response is equals to the challenge key saved earlier
	try {
		var randomNumber = GibberishAES.dec(challengeKey, keyResponse);
		
		var challengeResponse = GibberishAES.enc((999999999 - randomNumber), keyResponse);
		
		var body = {
			sessionID: loggedUser.sessionID,
			recipientUsername: username,
			response: challengeResponse
		}
		
		performPostRequest(
			serviceUrl + "response-chat-invitation",
			body,
			function () {
				$("#server-message-central-holder").fadeOut(800);
				startTimer();
				loadMainChat()
			},
			onError
		);
	}
	// catching the error if the cripting is not ok
	catch(err) {
		$("#descr").html("Wrong Key! Try Again");
	}
}

function startChat() {
	
	var response = messageServerData.response; // response from server message
	var secretKey = loggedUser.sentKey; // pass
	var randomNumber = 	messageServerData.randomNumber; // that's the generated earlier random number (invite)
	var username = messageServerData.username;
	
	
	$("#users-list li:contains(" + loggedUser.username + ")").remove();
	
	
	
	var decriptedSecretKey = GibberishAES.dec(response, secretKey); // decripting of the response with the secret key

	if (decriptedSecretKey == (999999999 - randomNumber)) {
		var body = {
			sessionID: loggedUser.sessionID,
			recipientUsername: username
		}
		
		performPostRequest(
			serviceUrl + "start-chat",
			body,
			loadMainChat,
			onError
		);
	}
	else {
		$("#descr").html("Wrong Key! Try Again");
	}
	
}

function loadMainChat() {
	$("#main-part").prepend(
		'<div id="chat">' + 
			'<div class="chat-labels" id="you-label">You</div>' + 
			'<div class="chat-labels" id="other-label">' +
			messageServerData.username +
			'</div>' + 
			'<div class="box-label">Chat</div>' +
			'<div id="cancel-button2"></div>' +
			'<div class="main-box-part">' +
				'<div id="message-part">' +
					// here is the message part with all of the messages between the users
				'</div>' +
			'<div>' +
			'<textarea id="text-chat"></textarea>' +
		'</div>'
	)
	
	document.getElementById("cancel-button2").onclick=cancelChat;
	
	// check if ENTER is pressed to send the message to the server
	$("#text-chat").keydown(function(event) {
	  if ((event.which == 13) && (($("#text-chat").val().length) > 0 )) {
			event.preventDefault();
			sendMessage();
			$("#text-chat").val('');
	   }
	});
}

function cancelChat() {

	var sessionID = loggedUser.sessionID;
	var username = messageServerData.username;
	
	body = {
		sessionID: sessionID,
		recipientUsername: username
	}
	
	performPostRequest(
		serviceUrl + "cancel-chat",
		body,
		function () {
			createMainContent();
			getOnlineUsers();
			$("#server-message-central-holder").fadeOut(800);
		},
		onError
	);
}

function sendMessage() {

	var msg = $("#text-chat").val();
	var username = messageServerData.username;
	var sessionID = loggedUser.sessionID;
	
	var encryptedMsg = GibberishAES.enc(msg , loggedUser.sentKey || loggedUser.recieveKey); // encripting the msg with the secret key
	
	var body = {
		sessionID: sessionID,
		recipientUsername: username,
		encryptedMsg: encryptedMsg
	}
	
	performPostRequest(
		serviceUrl + "send-chat-message",
		body,
		function () {
			$("#message-part").prepend(
				'<div class="your-message">' +
					'<div class="text">' +
						msg +
					'</div>' +
				'</div>');
				
				startTimer();
		},
		onError
	);

}

function onError(data) {
	var errorResponse = $.parseJSON(data.responseText); // get the 'user-friendly' error message
	$("#server-message-central").html(errorResponse.errorMsg);
	$("#server-message-central-holder").show(800);
	$("#server-message-central-holder").delay(3000).fadeOut(800);
}

function performGetRequest(
    serviceUrl,
    onSuccess,
    onError) {
    $.ajax({
        url: serviceUrl,
        type: "GET",
        timeout: 5000,
        dataType: "json",
        success: onSuccess,
        error: onError
    });
}

function performPostRequest(serviceUrl, data, onSuccess, onError) {
	$.ajax({
		url: serviceUrl,
		type: "POST",
		contentType: "application/json",
		timeout: 5000,
		dataType: "json",
		data: JSON.stringify(data),
		success: onSuccess,
		error: onError
	});
}