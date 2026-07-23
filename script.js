let tryBtn = document.getElementById("try-button");
let planBtn = document.getElementById("plan-btn");
let submitBtn = document.getElementById("form-submit-button");
tryBtn.addEventListener("click", function(){
    location.href = "./chat.html";
});

planBtn.addEventListener("click", function(){
    alert("Subscriptions coming soon!")
})

emailjs.init("CL192Y1b7AUbQ4nNB");
submitBtn.onclick = function(event){
    event.preventDefault();
    let values = {
    name: document.getElementById("form-name-field").value,
    email: document.getElementById("form-email-field").value,
    message: document.getElementById("form-message-field").value
}
    console.log(values)
    emailjs.send("service_4u8zqjp", "template_aokp6xc", values);
}
