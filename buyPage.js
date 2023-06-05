let items = [
    {
        "name": "Помідори",
        "quantity": 1
    },
    {
        "name": "Печиво",
        "quantity": 1
    },
    {
        "name": "Сир",
        "quantity": 2
    },
];

localStorage.setItem("startItems", JSON.stringify(items))
localStorage.setItem("items", JSON.stringify(items))
// localStorage.clear()

function addButtonFunction(){
    const inputField = document.getElementById("input");

    if(inputField.value !== "" && !items.some(item => item.name.toUpperCase() === inputField.value.toUpperCase())){
        items.push({"name": inputField.value, "quantity": 1})
        localStorage.setItem("items", JSON.stringify(items))
        const centerElement = document.getElementsByClassName("product-last")[0];
        if(centerElement){
            centerElement.className = "product-center"
        }

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
        removeButton.addEventListener("click", removeButtonHandler(lastProductArticle))

        lastProductArticle.appendChild(rightDiv)

        document.getElementsByClassName("product")[0].appendChild(lastProductArticle)

        const basketDiv = document.createElement("div")
        basketDiv.className = "product-item"

        const spanText = document.createElement("span")
        spanText.innerText = inputField.value + " "
        spanText.className = "text"
        basketDiv.appendChild(spanText)

        const divShell = document.createElement("div")
        divShell.className = "shell"

        const spanAmount = document.createElement("span")
        spanAmount.className = "amount"
        spanAmount.innerText = "1"
        divShell.appendChild(spanAmount)

        basketDiv.appendChild(divShell)

        document.getElementsByClassName("basket-second")[0].appendChild(basketDiv);

        inputField.value = "";
        inputField.focus();
    }
}
function removeButtonHandler(block) {
    return function(event) {
        block.parentNode.removeChild(block);

        const text = block.getElementsByClassName("left")[0].getElementsByTagName("span")[0].innerText;
        const index = items.findIndex(item => item.name === text);
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items))

        const spanTextArray = document.getElementsByClassName("text");

        for (let i = 0; i < spanTextArray.length; i++) {
            if (spanTextArray[i].innerText === text || spanTextArray[i].innerText.trim() === text) {
                const productDiv = spanTextArray[i].parentNode
                productDiv.parentNode.removeChild(productDiv)
                break
            }
        }

        if (block.className === "product-last"){
            if (document.getElementsByClassName("product-center").length - 1 !== -1) {
                document.getElementsByClassName("product-center")[document.getElementsByClassName("product-center").length - 1].className = "product-last"
            }
        }
    };
}

document.querySelector(".add-button").addEventListener("click", addButtonFunction);
document.addEventListener("keydown", function (event){
    if(event.key === "Enter") {
        addButtonFunction()
    }
})

const productBlocks = document.getElementsByClassName("product-center");

for (let i = 0; i < productBlocks.length; i++) {
    const deleteButton = productBlocks[i].querySelector(".delete");
    deleteButton.addEventListener("click", removeButtonHandler(productBlocks[i]));
}

const addButtons    = document.getElementsByClassName("add");
const removeButtons = document.getElementsByClassName("subtract");

for(let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", changeOneItem(addButtons[i].parentNode, 1))
    removeButtons[i].addEventListener("click", changeOneItem(removeButtons[i].parentNode, -1))
}

function changeOneItem(centerElement, counter) {
    return function (event) {
        if(centerElement.querySelector(".product-count").innerText !== "1" || counter === 1) {
            const count = centerElement.querySelector(".product-count")
            count.innerText = String(Number(count.innerText) + counter)
            const elementText = centerElement.parentNode.querySelector(".left span").innerText
            const elementIndex = items.findIndex(item => item.name === elementText)
            items[elementIndex].quantity = Number(count.innerText)

            localStorage.setItem("items", JSON.stringify(items))

            const rightTextElements = document.getElementsByClassName("text")

            for(let j = 0; j < rightTextElements.length; j++) {
                if(rightTextElements[j].innerText === elementText) {
                    rightTextElements[j].parentNode.querySelector(".shell .amount").innerText = Number(count.innerText)
                }
            }
        }
    }
}

document.getElementsByClassName("product-last")[0].querySelector(".delete").addEventListener("click", removeButtonHandler(document.getElementsByClassName("product-last")[0]));