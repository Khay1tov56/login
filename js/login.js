const elForm = document.querySelector(".form");
const elInputEmail = document.querySelector(".email");
const elInputPassword = document.querySelector(".password");

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let elEmailValue = elInputEmail.value.trim();
    let elPasswordValue = elInputPassword.value.trim();

    async function tokenlogin() {

       try {
        const response = await fetch("http://192.168.7.64:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: elEmailValue,
                password: elPasswordValue
            })
        })
        const data = await response.json()
        if(data.token) {
            localStorage.setItem("tokenlogin", data.token);
            window.location.pathname = "index.html";
        }
       } catch (error) {
        console.log(error);
       }
    }
    
    tokenlogin()

})

if(localStorage.getItem("tokenlogin")){
    window.location.pathname = "index.html";
}