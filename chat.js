let sendIcon = document.getElementById("send-icon");
let messagesDiv = document.getElementById("messages-div");
let inputField = document.getElementById("input-field");
let welcomeText = document.getElementById("welcome-text");
let loginButton = document.getElementById("login-button");
let blurLoginDiv = document.querySelector(".blur-login-div");
let loginSubmitButton = document.getElementById("login-submit-button");
let profilePictureDiv = document.getElementById("profile-picture-div");
let isLoggedIn = false;


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
    userMessage.style.background = "#FE7F2D";
  AIResponse()
  inputField.value = "";
}
}



async function AIResponse(){
  const GROQ_API_KEY = "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";
  const response = await fetch("https://github.com/Abdoaref739/Rafeeq-AI-chatbot/security/secret-scanning/unblock-secret/api.groq.com/openai/v1/chat/completions", {
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



  
    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    messagesDiv.appendChild(botMessage);
    botMessage.style.marginTop += "50px";
    botMessage.innerHTML = parsedResults;
    botMessage.style.background = "#233D4D";
    botMessage.style.paddingLeft = "30px";
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



let moonIcon = document.getElementById("moon-mode-icon");
let sunIcon = document.getElementById("sun-mode-icon");

moonIcon.onclick = function(){
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
}
sunIcon.onclick = function(){
  moonIcon.style.display = "block";
  sunIcon.style.display = "none";
}






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
  welcomeText.innerHTML = "welcome back, ";
  usernameText.textContent = window.localStorage.getItem("name");
}
if(localStorage.getItem("name") == "" || !localStorage.getItem("name")){
  loginButton.style.display = "block";
  profilePictureDiv.style.display = "none";
  isLoggedIn = false;
  welcomeText.innerHTML = "Welcome,";
}
}
