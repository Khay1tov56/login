let elForm = document.querySelector(".form")
let elInput = document.querySelector(".input")
const elList = document.querySelector(".list")
const tokenLogin = localStorage.getItem("tokenlogin");


if (!tokenLogin) {
    window.location.reload();
    window.location.pathname = "login.html";
}

function todoPost() {
    try {
        fetch("http://192.168.7.64:5000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: tokenLogin,
            },
            body: JSON.stringify({
                text: elInput.value.trim()
            }),
        })
    } catch (error) {
        console.log(error);
    }
}

async function getTodos() {
    try {
        const respon = await fetch("http://192.168.7.64:5000/todo", {
            headers: {
                Authorization: tokenLogin
            }
        })
        const data = await respon.json();

        elList.innerHTML = "";
        if (data.length > 0) {

            data.forEach(item => {
                elList.innerHTML += `
                
        <li>
        ${item.todo_value}
        <button class= "btn-edit" data-id="${item.id}">Edit</button>
        <button class= "btn-delete" data-id="${item.id}">Delete</button>
        </li>
                
                `
            })
        }

    } catch (error) {
        console.log(error);
    }
}

function deleteItem (id) {
    fetch("http://192.168.7.64:5000/todo/" + id, {
        method: "DELETE",
        headers: {
            Authorization: tokenLogin
        }
    })
    .then (res => res.json())
    .then (data => console.log(data))
}


elList.addEventListener("click", function(evt) {
    if(evt.target.matches(".btn-delete")) {
        const id = evt.target.dataset.id;
        deleteItem(id);
    }
})

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    todoPost();
    getTodos();
    elInput.innerHTML = "";
})

getTodos()
// setInterval(() => {
//     window.location.pathname = "login.html";
// }, 8000);