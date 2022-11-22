// const tokenLogin = localStorage.getItem("token-login");
// const elFormTodo = document.querySelector(".form-todo");
// const elFormTodoInput = document.querySelector(".inputtodo");
// const elTodoList = document.querySelector(".list-todo");


// if(!tokenLogin){
//   window.location.reload();
//   window.location.pathname = "login.html";
// };

// // setTimeout

// async function getTodos(){
//   try {
//     const response = await fetch("http://192.168.6.201:5000/todo",{
//     headers:{
//       Authorization: tokenLogin
//     }
//   });

//   const data = await response.json();

//   elTodoList.innerHTML = "";

//   if(data.length > 0 ){
//     // const todoFragment = new DocumentFragment();

//     data.forEach(item =>{

//       elTodoList.innerHTML +=
//       `
//       <li>
//       ${item.todo_value}
//       <button class="edit-button" data-id="${item.id}">Edit</button>
//       <button class="delete-button" data-id="${item.id}">Delete</button>
//       </li>
//       `
//     });

//   }

// } catch (error) {
//   console.log(error);
// }
// }

// function postTodo(){
//   try {
//     fetch("http://192.168.6.201:5000/todo", {

//     method: "POST",

//     headers:{
//       "Content-Type": "application/json",
//       Authorization: tokenLogin
//     },

//     body:JSON.stringify(
//       {
//         text: elFormTodoInput.value.trim()
//       }
//       )
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }

// function editTodo(id){
//   const newTodo = prompt("Edit todo");
//   fetch("http://192.168.6.201:5000/todo/" + id, {
//   method:"PUT",

//   headers:{
//     "Content-Type":"application/json",
//     Authorization: tokenLogin
//   },

//   body:JSON.stringify(
//     {
//       text: newTodo
//     }
//   )
// })
// .then(res => res.json())
// .then(data => console.log(data));
// }

// function deleteTodo(id){
//   fetch("http://192.168.6.201:5000/todo/" + id, {
//   method:"DELETE",

//   headers:{
//     Authorization: tokenLogin
//   }
// })
// .then(res => res.json())
// .then(data => console.log(data));
// }



// elFormTodo.addEventListener("submit", (evt)=>{
//   evt.preventDefault();
//   getTodos();
//   postTodo();



//   elFormTodoInput.value = "";
// });

// getTodos();


// elTodoList.addEventListener("click", (evt)=>{
//   if(evt.target.matches(".edit-button")){
//     const id =  evt.target.dataset.id;
//   editTodo(id)
//     // getTodos()
//     window.location.reload()
//   }
// });




// elTodoList.addEventListener("click", (evt)=>{
//   if(evt.target.matches(".delete-button")){
//     const id =  evt.target.dataset.id;
//     deleteTodo(id)
//     // getTodos()
//     window.location.reload()
//   }
// })


const tokenLogin = localStorage.getItem("token-login");

let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;

async function productGet() {
    let fragment = document.createDocumentFragment()


    try {
        let res = await fetch("http://192.168.5.180:5000/product", {
            headers: {
                Authorization: tokenLogin,

            }
        })
        let data = await res.json()
        // console.log(data);
        data.forEach(element => {

            let elTemplateClone = elTemplate.cloneNode(true);
            // console.log(element);
            elTemplateClone.querySelector(".ism").textContent = element.product_name;
            elTemplateClone.querySelector(".image").src = `http://192.168.5.180:5000/${element.product_img}`;
            elTemplateClone.querySelector(".desc").textContent = element.product_desc;
            elTemplateClone.querySelector(".price").textContent = element.product_price;
            elTemplateClone.querySelector(".buy").dataset.id = element.id;

            fragment.appendChild(elTemplateClone);
        })
        elList.appendChild(fragment)

    } catch (error) {
        console.log(error);
    }
}

productGet()

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".buy")) {
        const buyId = evt.target.dataset.id;
        console.log(buyId);
        orderFnGet(buyId)

    }
})


       async function orderFnGet(id) {
        const orderDataForm = new FormData();
        orderDataForm.append("product_id", Number(id))
        try {
            let res = await fetch("http://192.168.5.180:5000/order", {
                method: "POST",

                headers: {
                    Authorization: tokenLogin
                },

                body: orderDataForm,

            })
            let data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
       }
