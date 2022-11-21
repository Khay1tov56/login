const tokenLogin = localStorage.getItem("token-login");
const elAdminForm = document.querySelector(".adminForm")
const elAdminProductName = document.querySelector(".product_name")
const elAdminProductDesc = document.querySelector(".product_desc")
const elAdminProductImg = document.querySelector(".product_img")
const elAdminProductPrice = document.querySelector(".product_price")
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;

async function productPost() {
    const productNameValue = elAdminProductName.value.trim()
    const productDescValue = elAdminProductDesc.value.trim()
    const productImgValue = elAdminProductImg;
    const productPriceValue = elAdminProductPrice.value.trim()

    try {

        const adminData = new FormData();

        adminData.append("product_name", productNameValue)
        adminData.append("product_desc", productDescValue)
        adminData.append("product_img", productImgValue.files[0])
        adminData.append("product_price", productPriceValue)
        await fetch("http://192.168.6.201:5000/product", {
            method: "POST",
            headers: {
                Authorization: tokenLogin,
            },
            body: adminData,
        })
    } catch (error) {
        console.log(error);
    }
}

async function productGet() {
    let fragment = document.createDocumentFragment()


    try {
        let res = await fetch("http://192.168.6.201:5000/product", {
            headers: {
                Authorization: tokenLogin,

            }
        })
        let data = await res.json()
        console.log(data);
        data.forEach(element => {
         
            let elTemplateClone = elTemplate.cloneNode(true);
            console.log(element);
            elTemplateClone.querySelector(".ism").textContent = element.product_name;
            elTemplateClone.querySelector(".image").src = `http://192.168.6.201:5000/${element.product_img}`;
            elTemplateClone.querySelector(".desc").textContent = element.product_desc;
            elTemplateClone.querySelector(".price").textContent = element.product_price;
            elTemplateClone.querySelector(".delete").dataset.id = element.id;
            elTemplateClone.querySelector(".edit").dataset.id = element.id;

            fragment.appendChild(elTemplateClone);
        })
        elList.appendChild(fragment)

    } catch (error) {
        console.log(error);
    }
}

productGet()



elAdminForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    productPost()
    // window.location.reload();

    elForm.innerHTML = "";
})

// Delete fn

function deleteTodo(id){
    fetch("http://192.168.6.201:5000/product/" + id, {
    method:"DELETE",
  
    headers:{
      Authorization: tokenLogin
    }
  })
  .then(res => res.json())
  .then(data => console.log(data));
}


elList.addEventListener("click", (evt)=>{
    if(evt.target.matches(".delete")){
      const id =  evt.target.dataset.id;
      deleteTodo(id)
      // getTodos()
      window.location.reload()
    }
  })


//   Edit fn


  function editTodo(id){
    const newName = prompt("Name todo");
    const newDesc = prompt("Desc todo");
    const newPrice= prompt("Price todo");
    fetch("http://192.168.6.201:5000/product/" + id, {
    method:"PUT",
  
    headers:{
      "Content-Type":"application/json",
      Authorization: tokenLogin
    },
  
    body:JSON.stringify(
      {
        product_name:newName,
        product_desc: newDesc,
        product_price: newPrice
      }
    )
  })
  .then(res => res.json())
  .then(data => console.log(data));
  }
  


  
elList.addEventListener("click", (evt)=>{
    if(evt.target.matches(".edit")){
      const id =  evt.target.dataset.id;
    editTodo(id)
      // getTodos()
      window.location.reload()
    }
  });