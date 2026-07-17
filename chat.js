let sendIcon = document.getElementById("send-icon");
let messagesDiv = document.getElementById("messages-div");
let inputField = document.getElementById("input-field");
let welcomeText = document.getElementById("welcome-text");
let loginButton = document.getElementById("login-button");
let blurLoginDiv = document.querySelector(".blur-login-div");
let loginSubmitButton = document.getElementById("login-submit-button");
let profilePictureDiv = document.getElementById("profile-picture-div");
let isLoggedIn = true;


function sendData(){
if(isLoggedIn === false){
sendIcon.disabled = true;
alert("please login first!")
inputField.value = "";
}else{
welcomeText.style.display = "none";
let userMessage = document.createElement("div");
userMessage.classList.add("user-message");
messagesDiv.appendChild(userMessage);
userMessage.style.marginTop += "20px";
userMessage.innerHTML = `<img src="#"><p>${inputField.value}</p>`;
AIResponse()
inputField.value = "";
}
}

sendIcon.addEventListener("click", function(){
sendData();
});


async function AIResponse(){
  const GROQ_API_KEY = "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";
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: inputField.value }]
    })
  });
  let data = await response.json();
  var result = data.choices[0].message.content;

    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    messagesDiv.appendChild(botMessage);
    botMessage.style.marginTop += "50px";
    botMessage.innerHTML = result;
    
  
       }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

loginButton.addEventListener("click", function(){
blurLoginDiv.style.display = "block";
});
loginSubmitButton.addEventListener("click", function(){
var email = document.getElementById("login-email-field").value;
var password = document.getElementById("login-password-field").value;
blurLoginDiv.style.display = "none";
let signInOptions = {
    'email': email,
    'password': password
}
console.log(signInOptions)
loginButton.style.display = "none";
profilePictureDiv.style.display = "block";
sendIcon.disabled = false;
isLoggedIn = true;
});

let increament = 100;
inputField.addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    sendData();
    increament += 200;
    messagesDiv.scrollIntoView();
  }
});