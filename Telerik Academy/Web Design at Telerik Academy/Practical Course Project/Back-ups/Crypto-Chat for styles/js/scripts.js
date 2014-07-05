var serviceUrl = "http://cryptochat.apphb.com/CryptoChatService.svc/"

$.support.cors = true;

// Declare a var for logged user with name and his sessionID
var loggedUser = {
	name: ' ',
	sessionID: ' ',
	sentKey: ' ',
	recieveKey: ' '
};

var messageServerData = {
	msgType: ' ',
	msgText: ' ',
	username: ' ',
	challengeKey: ' ',
	randomNumber: ' ',
	response: ' '
}

function onDocumentReady() {
	
	creatingLoginRegBoxes();
	
	setInterval(recieveMessageFromServer, 1000); // function for getting server messages
	
	$("#reg-btn").on("click", onRegBtnClick);
	$("#log-btn").on("click", onLogBtnClick);
	
}

function creatingLoginRegBoxes() {
	// Login show
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

	// Reg show
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
		"<aside id='who-is-online'>" +
				
			"<div class='box-label'>Online</div>" +
			
			"<div class='main-box-part'>" +
				
			"</div>" +
			
		"</aside>"
	);
	
	$("#logout-btn").on("click", onLogoutBtnClick); // handling logout function
	
}

function onRegBtnClick(e) {
   
	var name = $("#reg-name").val();
	var pass = $("#reg-password").val();
	var sum = "" + name + pass;
	var hash = CryptoJS.SHA1(sum);
	hash = hash.toString(CryptoJS.enc.Hex);
 
	var body = {
		username: name,
		authCode: hash.toString()
	};

	performPostRequest(
		serviceUrl + "register",
		body,
		function (data) {	
			// saving the name and sessionID at the global object
			loggedUser.name = name;
			loggedUser.sessionID = data.sessionID;
			
			createMainContent();
			getOnlineUsers();
			alert("You registered successfully!");
		},
		function (jqXHR, textStatus, errorThrown) {
			var errorResponse = $.parseJSON(jqXHR.responseText);
			alert(errorResponse.errorMsg);
		}
	);  
	
	return false;
	
}

function onLogBtnClick() {
	var name = $("#log-name").val();
	var pass = $("#log-password").val();
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
			alert("Logged!");
		},
		function (jqXHR, textStatus, errorThrown) { 
			loggedUser.name = '';
			var errorResponse = $.parseJSON(jqXHR.responseText);

			alert(errorResponse.errorMsg);
		}
	);  
	
	return false;
	
}

function onLogoutBtnClick() {

	performGetRequest(
		serviceUrl + "logout/" + loggedUser.sessionID,
		creatingIndex,
		function (err) { 
			alert(JSON.stringify(err.errorMsg));
		}
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
	
	creatingLoginRegBoxes();
	$("#reg-btn").on("click", onRegBtnClick);
	$("#log-btn").on("click", onLogBtnClick);
}

function getOnlineUsers() {

	performGetRequest(
		serviceUrl + "list-users/" + loggedUser.sessionID,
		function(data) {
		
			var onlineUsers = '<ul id="users-list">'
			for (var i = 0; i < data.length; i++) {
				onlineUsers +=
				'<li class="user"' + 
					[i] + 
					'"><a href="#">' +
					data[i] +
				'</a></li>'
			}

			onlineUsers += '</ul>';
					
			$("#who-is-online .main-box-part").append(onlineUsers);
			
			$("#users-list li a").on("click", showInvitationBox);
			
		},
		function (err) { 
			alert(JSON.stringify(err.errorMsg));
		}
	);
	
}

function showInvitationBox() {

	messageServerData.username = $(this).html(); // get the user you want to invite
	
	$(".cancel-button").on("click", cancelChat);
	$("#send-invitation-box").show(800);
	
	var secretKey = $("#sent-key-input").val(); // get the secret key of the users
	loggedUser.sentKey = secretKey; // saving the secret key so as to be used in other requests
	alert("loggedUser.sentKey: " + loggedUser.sentKey);
	$("#sent-key-submit").on("click", inviteUser);
	
}

function inviteUser() {
	
	$("#sent-key-input").val('');
	
	var randomNumber = Math.floor(Math.random() * 1000000000); // generating random number in interval 0 to 999 999 999
	messageServerData.randomNumber = randomNumber;
	alert("random: " + messageServerData.randomNumber);
	var username = messageServerData.username;
	alert("username: " + username);
	alert("loggedUser.sentKey just before challengeKey: " + loggedUser.sentKey);
	var challengeKey = GibberishAES.enc(randomNumber , loggedUser.sentKey);
	messageServerData.challengeKey = challengeKey;
	alert("chal. key: " + messageServerData.challengeKey);

	var body = {
		sessionID: loggedUser.sessionID,
		recipientUsername: username,
		challenge: challengeKey
	}

	performPostRequest(
		serviceUrl + "invite-user",
		body,
		function () {
			alert("Invitation was sent!");
			$("#send-invitation-box").fadeOut(800);
			
		},
		function (jqXHR, textStatus, errorThrown) {
			var errorResponse = $.parseJSON(jqXHR.responseText);
			alert(errorResponse.errorMsg);
		}
	);
	
}

function answerInvitation() {

	var username = messageServerData.username;
	var challengeKey = messageServerData.challengeKey;
	var keyResponse = $("#recieve-key-input").val();
	
	try 
	{	
	
		alert("username: " + username);
		alert("challengeKey: " + challengeKey);
		alert("loggedUser.recieveKey: " + loggedUser.recieveKey);
		alert("loggedUser.recieveKey: " + keyResponse);
		alert("Before!");
		
		
		var randomNumber = GibberishAES.dec(challengeKey, keyResponse || loggedUser.sentKey);
		alert("GibberishAES.dec(challengeKey, keyResponse): " + randomNumber);
		var challengeResponse = GibberishAES.enc((999999999 - randomNumber), keyResponse);
	
		alert("challengeResponse: " + challengeResponse);
	
		var body = {
				sessionID: loggedUser.sessionID,
				recipientUsername: username,
				response: challengeResponse
			}
			
		performPostRequest(
			serviceUrl + "response-chat-invitation",
			body,
			function () {
				$("#recieve-invitation-box").fadeOut(800);
				loadMainChat()
			},
			function (err) { 
				alert("Error");
			}
		);
			
	}
	catch(err) {
		alert("Wrong Password!");
	}
	
	return false;
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
				$("#who-is-online .main-box-part").empty();
				getOnlineUsers();
				$("#server-message-holder").delay(5000).fadeOut(800);
			}
			// chat invitation
			else if(data.msgType == "MSG_CHALLENGE") {
				
				//saving challengeKey and username in the global object to use them in the next functions
				messageServerData.challengeKey = data.msgText;
				messageServerData.username = data.username;
				$("#recieve-information-box").html('<div id="left"><div id="invitation" style="color:black"><a href="#">' + 
					data.username + ' invite you to a chat</a></div></div><div id="right"><div id="cancel-button"></div></div>');
				$("#invitation a").on("click", answerInvitation);
				
				$("#recieve-invitation-box").show(800);
				
			/*	$("#recieve-invitation-central p").html(
					'You have message invitation from ' +
					messageServerData.username + 
					'<div class="cancel-button"></div>' 
				);
				
				$("#recieve-invitation-box").show(800);
				
				$(".cancel-button").on("click", cancelChat); // handling cancel function to the cancel button
				
				$("#recieve-key-submit").on("click", answerInvitation);
				*/
				
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
				
				$("#server-message-holder").show(800);
				$("#server-message").html('<div style="color:black">You have a chat message from ' + data.username + '</div>');
				$("#server-message-holder").delay(5000).fadeOut(800);

			}

		},
		function (jqXHR, textStatus, errorThrown) {
			var errorResponse = $.parseJSON(jqXHR.responseText);
			var a = errorResponse.errorMsg
			$("#server-message").html(a);
		}
	); 

}

function startChat() {
	
	var response = messageServerData.response; // response from server message
	var secretKey = loggedUser.sentKey; // pass
	var randomNumber = 	messageServerData.randomNumber; // that's the generated earlier random number (invite)
	var username = messageServerData.username;

	var decriptedSecretKey = GibberishAES.dec(response, secretKey);

	if (decriptedSecretKey == (999999999 - randomNumber)) {
	
		var body = {
			sessionID: loggedUser.sessionID,
			recipientUsername: username
		}
		
		performPostRequest(
			serviceUrl + "start-chat",
			body,
			loadMainChat,
			function (err) { 
				alert("Error");
			}
		);
	}
	else {
		alert("Wrong Secret Key!")	
	}
	
}

function loadMainChat() {
	$("#main-part").prepend(
		"<div id='chat'>" + 
			"<div class='box-label'>Chat</div>" +
			'<div id="cancel-button2"></div>' +
			"<div class='main-box-part'>" +
				'<div id="message-part">' +
					// here is the message part with all of the messages between the users
				'</div>' +
			"<div>" +
			'<textarea id="text-chat"></textarea>' +
		"</div>"
	)
	
	$(".cancel-button2").on("click", cancelChat);
	
	// check if ENTER is pressed to send the message to the server
	$("#text-chat").keydown(function(event) {
	  if (event.which == 13) {
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
			$("#send-invitation-box").fadeOut(800);
		},
		function (err) { 
			alert("Error");
		}
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
				"<div class='your-message'>" +
					"<div class='text'>" +
						msg +
					"</div>" +
				"</div>")
		},
		function (jqXHR, textStatus, errorThrown) {
			var errorResponse = $.parseJSON(jqXHR.responseText);

			alert(errorResponse.errorMsg);
		}
	);

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