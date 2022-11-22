const elForm = document.querySelector(".form-register");
const elFormInputName = document.querySelector(".text-register");
const elFormInputEmail = document.querySelector(".email-register");
const elFormInputPhone = document.querySelector(".phone-register");
const elFormInputPassword = document.querySelector(".password-register");


async function register(){

  const nameValue = elFormInputName.value.trim() 
  const emailValue = elFormInputEmail.value.trim() 
  const phoneValue = elFormInputPhone.value.trim() 
  const passwordValue = elFormInputPassword.value.trim() 

  try {
    let formDataRegister = new FormData();

    formDataRegister.append("user_name", nameValue)
    formDataRegister.append("email", emailValue)
    formDataRegister.append("phone", phoneValue)
    formDataRegister.append("password", passwordValue)

    const response = await fetch("http://192.168.5.180:5000/user/register", {
    method: "POST",


    // headers:{
    //   "Content-Type": "application/json",
    // },

    body: formDataRegister

    })

    const data = await response.json();

    console.log(data);
    if(data.token){
      window.localStorage.setItem("token-register", data.token);
      window.location.pathname = "index.html";
    }

  } catch (error) {
    console.log(error);
  }

}


elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();

  register()

})

// elPasswordImgOf.addEventListener("click", function (evt){
//     evt.preventDefault();
//     if(elPasswordValue = "password") {
//         elInputPassword.type = "text";
//     }else  {
//         elInputPassword.type = "password";
//     }

// elPasswordImgOf.classList.add("blockonactiv")
// elPasswordImgOn.classList.add("blockonactivof")
// })

// elPasswordImgOn.addEventListener("click", function (evt){
//     evt.preventDefault();
//     if(elPasswordValue = "text") {
//         elInputPassword.type = "password";
//     }

// elPasswordImgOn.classList.add("blockonactivof")
// elPasswordImgOf.classList.add("blockonactiv")
// })