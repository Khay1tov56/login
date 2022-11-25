const tokenLogin = localStorage.getItem("token-login");
const elAdminForm = document.querySelector(".adminForm")
const elAdminProductName = document.querySelector(".product_name")
const elAdminProductDesc = document.querySelector(".product_desc")
const elAdminProductImg = document.querySelector(".product_img")
const elAdminProductPrice = document.querySelector(".product_price")
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;

// let wfKey = "192.168.7.56"

// // Modal
// let elModalForm = document.querySelector(".modalForm")
// let elModalProducetName = document.querySelector(".modal-product_name")
// let elModalProducetDesc = document.querySelector(".modal-product_desc")
// let elModalProducetImg = document.querySelector(".modal-product_img")
// let elModalProducetPrice = document.querySelector(".modal-product_price")

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
        await fetch("http://192.168.4.126:5000/product", {
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
        let res = await fetch("http://192.168.4.126:5000/product", {
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
            elTemplateClone.querySelector(".image").src = `http://192.168.4.126:5000/${element.product_img}`;
            elTemplateClone.querySelector(".desc").textContent = element.product_desc;
            elTemplateClone.querySelector(".price").textContent = element.product_price;
            elTemplateClone.querySelector(".delete").dataset.id = element.id;
            elTemplateClone.querySelector(".edit-button").dataset.id = element.id;

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
    setTimeout(() => {
        window.location.reload(); 
     }, 1000);

})

// Delete fn

async function deleteTodo(id) {
 
   try {
    await fetch("http://192.168.4.126:5000/product/" + id, {

            method: "DELETE",

            headers: {

                Authorization: tokenLogin,
            }
        })

        
   } catch (error) {
    console.log(error);
   }
    
    
}


elList.addEventListener("click", (evt) => {
    if (evt.target.matches(".delete")) {
        const id = evt.target.dataset.id;
        deleteTodo(id)
        setTimeout(() => {
            window.location.reload(); 
         }, 1000);
        // getTodos()
        // window.location.reload()
    }
})


function editShop(id){
    const formDate = new FormData()
    
    formDate.append("product_name", elAdminProductName.value.trim());
    formDate.append("product_desc", elAdminProductDesc.value.trim());
    formDate.append("product_price", elAdminProductPrice.value.trim());
    formDate.append("product_img", elAdminProductImg.files[0]);
    
    fetch("http://192.168.4.126:5000/product/" + id, {
    method:"PUT",
    headers:{
        Authorization: tokenLogin
    },
    body: formDate
})
}

elList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".edit-button")){
        console.log("found");
        const id =  evt.target.dataset.id;
        editShop(id)
        setTimeout(() => {
            window.location.reload(); 
         }, 1000);
    }
})


//   Edit fn


// function edit(id) {
    
//         let dataForm = new FormData();

//         dataForm.append("product_name", elAdminProductName.value)
//         dataForm.append("product_desc", elAdminProductDesc.value)
//         dataForm.append("product_img", elAdminProductImg.files[0])
//         dataForm.append("product_price", elAdminProductPrice.value)

//         let res = fetch("http://192.168.5.180:5000/product/" + id, {
//                 method: "PUT",

//                 headers: {

//                     Authorization: tokenLogin
//                 },

//                 body: dataForm,
//             })
//             .then(res => res.json())
//             .then(data => console.log(data))
//             .catch(error => console.log(error))
       

// }


// elList.addEventListener("click", (evt) => {
//     if (evt.target.matches(".edit-button")) {
//         const id = evt.target.dataset.id;
//         edit(id)
//         console.log(id);
//         // getTodos()
//         // window.location.reload()
//     }
// });


// function editProduct(id) {
//     let formEditData = new FormData();
  
//     formEditData.append("product_name", elAdminProductName.value);
//     formEditData.append("product_desc", elAdminProductDesc.value);
//     formEditData.append("product_img", elAdminProductImg.files[0]);
//     formEditData.append("product_price", elAdminProductPrice.value);
  
//     fetch("http://192.168.5.180:5000/product/" + id, {
//       method: "PUT",
//       headers: {
//         Authorization: tokenLogin,
//       },
//       body: formEditData,
//     });
//     console.log(formEditData);
//   }
  
  
//   elList.addEventListener("click", (evt) => {
//     if (evt.target.matches(".edit-button")) {
//       const editBtnId = evt.target.dataset.id;
//       editProduct(editBtnId);
//       console.log(editBtnId);
//     }
//   });