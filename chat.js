let sendIcon = document.getElementById("send-icon");
let plusIcon = document.getElementById("plus-icon");
let messagesDiv = document.getElementById("messages-div");
let inputField = document.getElementById("input-field");
let welcomeText = document.getElementById("welcome-text");
let loginButton = document.getElementById("login-button");
let blurLoginDiv = document.querySelector(".blur-login-div");
let loginSubmitButton = document.getElementById("login-submit-button");
let profilePictureDiv = document.getElementById("profile-picture-div");
let isLoggedIn = false;
let userMessage;
let botMessage;
let darkMode = true;
let lightMode = false;
let moonIcon = document.getElementById("moon-mode-icon");
let sunIcon = document.getElementById("sun-mode-icon");
let spoilerText = document.querySelector(".spoiler-text");
let inputContainer = document.querySelector(".input-container");
let logOutBtn = document.querySelector(".log-out-div");


function sendData(){
  if(isLoggedIn === false){
    sendIcon.disabled = true;
    alert("please login first!")
    inputField.value = "";
  }else{
    welcomeText.style.display = "none";
    userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    messagesDiv.appendChild(userMessage);
    userMessage.style.marginTop += "20px";
    userMessage.innerHTML = `<img src="#"><p>${inputField.value}</p>`;
  AIResponse()
  inputField.value = "";
}
}



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
  var parsedResults = marked.parse(result);



  
    botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    messagesDiv.appendChild(botMessage);
    botMessage.style.marginTop += "50px";
    botMessage.innerHTML = parsedResults;
    botMessage.style.paddingLeft = "25px";
    botMessage.style.paddingTop = "20px";
    botMessage.style.paddingRight = "20px";
    botMessage.style.paddingBottom = "20px";
  
       }




loginButton.addEventListener("click", function(){
blurLoginDiv.style.display = "block";
});
loginSubmitButton.addEventListener("click", function(){
var name = document.getElementById("login-name-field").value;
var password = document.getElementById("login-password-field").value;
blurLoginDiv.style.display = "none";
let signInOptions = {
    'name': name,
    'password': password
}
window.localStorage.setItem("name", name);
console.log(signInOptions)
sendIcon.disabled = false;
isLoggedIn = true;
window.location.reload();



});



inputField.addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    if(isLoggedIn === true){
    sendData();
    }else{
      alert("login first")
    }

  }
});








sendIcon.addEventListener("click", function(){
  if(isLoggedIn === true){
        sendData();
  }else{
    alert("login first")
  }
});


window.onload = function(){
let usernameText = document.getElementById("username-text");
if(localStorage.getItem("name")){
  loginButton.style.display = "none";
  profilePictureDiv.style.display = "block";
  isLoggedIn = true;
  welcomeText.innerHTML = `welcome back,  &nbsp; <i>${localStorage.getItem("name")}</i>`;
}
if(localStorage.getItem("name") == "" || !localStorage.getItem("name")){
  loginButton.style.display = "block";
  profilePictureDiv.style.display = "none";
  isLoggedIn = false;
  welcomeText.innerHTML = `welcome, user!`;
}
}





moonIcon.onclick = function(){
  sunIcon.style.display = "block";
  moonIcon.style.display = "none";
  lightMode = true;
  darkMode = false;
if(lightMode && !darkMode){
  lightModeFunction();
}
  
}
sunIcon.onclick = function(){
  moonIcon.style.display = "block";
  sunIcon.style.display = "none";
  lightMode = false;
  darkMode = true;
if(darkMode){
  darkModeFunction();
  }
}

function lightModeFunction(){
  sunIcon.style.color = "#000000";
  welcomeText.style.color = "#000000";
  spoilerText.style.color = "#000000";
  plusIcon.style.color = "#000000";
  inputContainer.style.background = "#dff0f8";
  inputField.style.color = "#000000";
  sendIcon.style.color = "#000000";
  logOutBtn.style.background = "#000000";
  document.body.style.backgroundColor = "#f2f8ff";
  userMessage.style.background = "#3B82F6";
  botMessage.style.background = "#1E3A8A";
}

function darkModeFunction(){
  moonIcon.style.color = "#ffffff";
  welcomeText.style.color = "#ffffff";
  spoilerText.style.color = "#ffffff";
  plusIcon.style.color = "#ffffff";
  inputContainer.style.background = "#2f2e2e";
  inputField.style.color = "#ffffff";
  sendIcon.style.color = "#ffffff";
  document.body.style.backgroundColor = "#020202";
  userMessage.style.background = "#FE7F2D";
  botMessage.style.background = "#494949";
}



logOutBtn.addEventListener("click", function(){
  localStorage.removeItem("name");
  window.location.reload();
});
profilePictureDiv.addEventListener("click", function(){
  if(logOutBtn.style.display === "none"){
    logOutBtn.style.display = "block";
  }else{
    logOutBtn.style.display = "none";
  }
});
