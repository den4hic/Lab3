const addButton = document.querySelector(".add-button");

function addButtonFunction(){
    const inputField = document.getElementById("input");

    if(inputField.value !== ""){
        document.getElementsByClassName("product-last")[0].className = "product-center"

        const lastProductArticle = document.createElement("article")
        lastProductArticle.className = "product-last"

        const leftDiv = document.createElement("div")
        leftDiv.className = "left"

        const leftSpan = document.createElement("span")
        leftSpan.innerText = inputField.value

        leftDiv.appendChild(leftSpan)
        lastProductArticle.appendChild(leftDiv)

        const centerDiv = document.createElement("div")
        centerDiv.className = "center"

        const subtractButton = document.createElement("button")
        subtractButton.textContent = "-"
        subtractButton.type = "button"
        subtractButton.setAttribute("data-tooltip", "Відняти")
        subtractButton.className = "subtract"
        centerDiv.appendChild(subtractButton)

        const countSpan = document.createElement("span")
        countSpan.className = "product-count"
        countSpan.innerText = "1"
        centerDiv.appendChild(countSpan)

        const addButton = document.createElement("button")
        addButton.textContent = "+"
        addButton.type = "button"
        addButton.setAttribute("data-tooltip", "Додати")
        addButton.className = "add"
        centerDiv.appendChild(addButton)

        lastProductArticle.appendChild(centerDiv)

        const rightDiv = document.createElement("div")
        rightDiv.className = "right"

        const boughtButton = document.createElement("button")
        boughtButton.textContent = "Куплено"
        boughtButton.type = "button"
        boughtButton.setAttribute("data-tooltip", "Купити всі товари")
        boughtButton.className = "bought"
        rightDiv.appendChild(boughtButton)

        const removeButton = document.createElement("button")
        removeButton.textContent = "x"
        removeButton.type = "button"
        removeButton.setAttribute("data-tooltip", "Видалити предмет")
        removeButton.className = "delete"
        rightDiv.appendChild(removeButton)

        lastProductArticle.appendChild(rightDiv)

        document.getElementsByClassName("product")[0].appendChild(lastProductArticle)

        inputField.value = "";
        inputField.focus();
    }
}

addButton.addEventListener("click", addButtonFunction);
document.addEventListener("keydown", function (event){
    if(event.key === "Enter") {
        addButtonFunction()
    }
})