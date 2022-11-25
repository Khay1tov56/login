const tokenLogin = localStorage.getItem("token-login");
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;

async function productGet() {
    let fragment = document.createDocumentFragment()


    try {
        let res = await fetch("http://192.168.4.126:5000/order", {
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
            elTemplateClone.querySelector(".delete").dataset.id = element.id;

            fragment.appendChild(elTemplateClone);
        })
        elList.appendChild(fragment)

    } catch (error) {
        console.log(error);
    }
}

productGet()