const tokenLogin = localStorage.getItem("token-login");
const elFormTodo = document.querySelector(".form-todo");
const elFormTodoInput = document.querySelector(".inputtodo");
const elTodoList = document.querySelector(".list-todo");


if(!tokenLogin){
  window.location.reload();
  window.location.pathname = "login.html";
};

// setTimeout

async function getTodos(){
  try {
    const response = await fetch("http://192.168.6.201:5000/todo",{
    headers:{
      Authorization: tokenLogin
    }
  });

  const data = await response.json();

  elTodoList.innerHTML = "";

  if(data.length > 0 ){
    // const todoFragment = new DocumentFragment();

    data.forEach(item =>{

      elTodoList.innerHTML +=
      `
      <li>
      ${item.todo_value}
      <button class="edit-button" data-id="${item.id}">Edit</button>
      <button class="delete-button" data-id="${item.id}">Delete</button>
      </li>
      `
    });

  }

} catch (error) {
  console.log(error);
}
}

function postTodo(){
  try {
    fetch("http://192.168.6.201:5000/todo", {

    method: "POST",

    headers:{
      "Content-Type": "application/json",
      Authorization: tokenLogin
    },

    body:JSON.stringify(
      {
        text: elFormTodoInput.value.trim()
      }
      )
    });

  } catch (error) {
    console.log(error);
  }
}

function editTodo(id){
  const newTodo = prompt("Edit todo");
  fetch("http://192.168.6.201:5000/todo/" + id, {
  method:"PUT",

  headers:{
    "Content-Type":"application/json",
    Authorization: tokenLogin
  },

  body:JSON.stringify(
    {
      text: newTodo
    }
  )
})
.then(res => res.json())
.then(data => console.log(data));
}

function deleteTodo(id){
  fetch("http://192.168.6.201:5000/todo/" + id, {
  method:"DELETE",

  headers:{
    Authorization: tokenLogin
  }
})
.then(res => res.json())
.then(data => console.log(data));
}



elFormTodo.addEventListener("submit", (evt)=>{
  evt.preventDefault();
  getTodos();
  postTodo();



  elFormTodoInput.value = "";
});

getTodos();


elTodoList.addEventListener("click", (evt)=>{
  if(evt.target.matches(".edit-button")){
    const id =  evt.target.dataset.id;
  editTodo(id)
    // getTodos()
    window.location.reload()
  }
});




elTodoList.addEventListener("click", (evt)=>{
  if(evt.target.matches(".delete-button")){
    const id =  evt.target.dataset.id;
    deleteTodo(id)
    // getTodos()
    window.location.reload()
  }
})

















