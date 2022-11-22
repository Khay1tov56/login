const elForm = document.querySelector(".login-form");
const elFormInputEmail = document.querySelector(".login-email");
const elFormInputPassword = document.querySelector(".login-password");


async function login(){
  const emailValueLogin = elFormInputEmail.value.trim();
  const passwordValueLogin = elFormInputPassword.value.trim();
  try {
    let dataFormLogin = new FormData();
    dataFormLogin.append("email", emailValueLogin)
    dataFormLogin.append("password", passwordValueLogin)
    const response = await fetch("http://192.168.5.180:5000/user/login", {
    method: "POST",

    body: dataFormLogin,
    })

    const data = await response.json();

    console.log(data);
    if(data.token){
      window.localStorage.setItem("token-login", data.token);
      window.location.pathname = "index.html";
    }

  } catch (error) {
    console.log(error);
  }

}


elForm.addEventListener("submit", (evt)=>{
  evt.preventDefault();

  login()

})