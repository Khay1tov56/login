const elBody = document.querySelector("body");
const elForm = document.querySelector(".form");
const elInputText = document.querySelector(".text");
const elInputEmail = document.querySelector(".email");
const elInputPhone = document.querySelector(".phone");
const elInputPassword = document.querySelector(".password");
const elPasswordImgOf = document.querySelector(".blockof");
const elPasswordImgOn = document.querySelector(".blockon");

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let elTextValue = elInputText.value.trim();
    let elEmailValue = elInputEmail.value.trim();
    let elPhoneValue = elInputPhone.value.trim();
    let elPasswordValue = elInputPassword.value.trim();

    async function tokenregister() {

       try {
        const response = await fetch("http://192.168.7.64:5000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_name:elTextValue,
                email: elEmailValue,
                phone: elPhoneValue,
                password: elPasswordValue
            })
        })
        const data = await response.json()
        
        if(data.token) {
            localStorage.setItem("token-register", data.token);
            window.location.pathname = "index.html"
        }
       } catch (error) {
        console.log(error);
       }
    }
    
    tokenregister()

})

elPasswordImgOf.addEventListener("click", function (evt){
    evt.preventDefault();
    if(elPasswordValue = "password") {
        elInputPassword.type = "text";
    }else  {
        elInputPassword.type = "password";
    }

elPasswordImgOf.classList.add("blockonactiv")
elPasswordImgOn.classList.add("blockonactivof")
})

elPasswordImgOn.addEventListener("click", function (evt){
    evt.preventDefault();
    if(elPasswordValue = "text") {
        elInputPassword.type = "password";
    }

elPasswordImgOn.classList.add("blockonactivof")
elPasswordImgOf.classList.add("blockonactiv")
})