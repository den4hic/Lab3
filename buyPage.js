let defaultItems = [
    {
        name: "Помідори",
        quantity: 1,
        isBought: false
    },
    {
        name: "Печиво",
        quantity: 1,
        isBought: false
    },
    {
        name: "Сир",
        quantity: 2,
        isBought: false
    },
];
let items = [];

if(localStorage.items === undefined || localStorage.items === "[]"){
    defaultItems.forEach(item => createBlock(item.name, item.quantity, item.isBought, true))
    items = defaultItems
} else {
    let startItems = JSON.parse(localStorage.items)
    startItems.forEach(item => createBlock(item.name, item.quantity, item.isBought, true))
    items = startItems
}

function createBlock(text, quantity=1, isBought=false, isStarted=false){
    if(text !== "" && !items.some(item => item.name.toUpperCase() === text.toUpperCase())) {
        items.push({name: text, quantity: quantity, isBought: isBought})
        localStorage.setItem("items", JSON.stringify(items))
        const centerElement = document.getElementsByClassName("product-last")[0];
        if (centerElement) {
            centerElement.className = "product-center"
        }

        const lastProductArticle = document.createElement("article")
        lastProductArticle.className = "product-last"

        const leftDiv = document.createElement("div")
        leftDiv.className = "left"

        const leftSpan = document.createElement("span")
        leftSpan.innerText = text
        leftSpan.addEventListener("click", inputFieldCreator(leftSpan))

        leftDiv.appendChild(leftSpan)
        lastProductArticle.appendChild(leftDiv)

        const centerDiv = document.createElement("div")
        centerDiv.className = "center"

        const subtractButton = document.createElement("button")
        subtractButton.textContent = "-"
        subtractButton.type = "button"
        subtractButton.setAttribute("data-tooltip", "Відняти")
        subtractButton.className = "subtract"

        subtractButton.addEventListener("click", changeOneItem(centerDiv, -1))

        centerDiv.appendChild(subtractButton)

        const countSpan = document.createElement("span")
        countSpan.className = "product-count"
        countSpan.innerText = String(quantity)
        centerDiv.appendChild(countSpan)

        const addButton = document.createElement("button")
        addButton.textContent = "+"
        addButton.type = "button"
        addButton.setAttribute("data-tooltip", "Додати")
        addButton.className = "add"

        addButton.addEventListener("click", changeOneItem(centerDiv, 1))

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
        boughtButton.addEventListener("click", boughtFunction(boughtButton))

        const notBoughtButton = document.createElement("button")
        notBoughtButton.textContent = "Не куплено"
        notBoughtButton.type = "button"
        notBoughtButton.setAttribute("data-tooltip", "Купити всі товари")
        notBoughtButton.className = "not-bought"
        rightDiv.appendChild(notBoughtButton)
        notBoughtButton.style.display = "none"
        notBoughtButton.addEventListener("click", notBoughtFunction(notBoughtButton))

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
        spanText.innerText = text + " "
        spanText.className = "text"
        basketDiv.appendChild(spanText)

        const divShell = document.createElement("div")
        divShell.className = "shell"

        const spanAmount = document.createElement("span")
        spanAmount.className = "amount"
        spanAmount.innerText = String(quantity)
        divShell.appendChild(spanAmount)

        basketDiv.appendChild(divShell)

        document.getElementsByClassName("basket-second")[0].appendChild(basketDiv);

        if(isBought){
            boughtFunction(boughtButton)()
        }
    }
}

function addButtonFunction(){
    const inputField = document.getElementById("input");

    if(inputField.value !== "" && !items.some(item => item.name.toUpperCase() === inputField.value.toUpperCase())){
        createBlock(inputField.value)

        inputField.value = "";
        inputField.focus();
    }
}
function removeButtonHandler(block) {
    return function(event) {
        console.log(block)
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

const addButtons       = document.getElementsByClassName("add");
const removeButtons    = document.getElementsByClassName("subtract");
const spans            = document.querySelectorAll('.left span');
const boughtButtons    = document.getElementsByClassName("bought");
const notBoughtButtons = document.getElementsByClassName("not-bought");

function updateText(mainSpan, input) {
    return function (event) {
        let text  = mainSpan.textContent
        let index = items.findIndex(item => item.name === mainSpan.textContent);

        items[index].name = input.value
        localStorage.setItem("items", JSON.stringify(items))

        const textArray = document.getElementsByClassName("text");

        for (let i = 0; i < textArray.length; i++) {
            if (textArray[i].innerText === text || textArray[i].innerText.trim() === text) {
                textArray[i].textContent = input.value + " "
                break
            }
        }

        mainSpan.textContent = input.value;
        mainSpan.style.display = "inline-block";
        mainSpan.parentNode.removeChild(input)
    }
}

function inputFieldCreator(mainSpan) {
    return function (event) {

        const input = document.createElement("input")
        input.value = mainSpan.innerText

        input.addEventListener("blur", updateText(mainSpan, input))

        mainSpan.parentNode.appendChild(input)
        input.focus()
        mainSpan.style.display = "none";
    }
}

function boughtFunction(boughtButton) {
    return function (event) {

        let textSpan  = boughtButton.parentNode.parentNode.querySelector(".left span")
        let textValue = textSpan.textContent
        let textS     = document.createElement("s")
        const index   = items.findIndex(item => item.name === textValue);

        let notBought = textSpan.parentNode.parentNode.querySelector(".right .not-bought")

        textS.innerText = textValue

        items[index].isBought = true
        localStorage.setItem("items", JSON.stringify(items))

        const sTextArray = document.getElementsByClassName("text");

        for (let i = 0; i < sTextArray.length; i++) {
            if (sTextArray[i].innerText === textValue || sTextArray[i].innerText.trim() === textValue) {
                const productDiv = sTextArray[i].parentNode
                productDiv.parentNode.removeChild(productDiv)
                break
            }
        }

        let productDiv      = document.createElement("div")
        let textNotBought   = document.createElement("s")
        let shellDiv        = document.createElement("div")
        let amountNotBought = document.createElement("s")

        productDiv.className      = "product-item"
        textNotBought.className   = "text"
        shellDiv.className        = "shell"
        amountNotBought.className = "amount"

        textNotBought.innerText   = textValue + " "
        amountNotBought.innerText = items[index].quantity

        shellDiv.appendChild(amountNotBought)
        productDiv.appendChild(textNotBought)
        productDiv.appendChild(shellDiv)

        document.querySelector(".basket-fourth").appendChild(productDiv)

        boughtButton.parentNode.parentNode.querySelector(".center .subtract").style.display = "none"
        boughtButton.parentNode.parentNode.querySelector(".center .add").style.display = "none"
        boughtButton.parentNode.querySelector(".delete").style.display = "none"
        boughtButton.parentNode.parentNode.querySelector(".left").removeChild(textSpan)
        boughtButton.parentNode.parentNode.querySelector(".left").appendChild(textS)

        notBought.style.display = "inline-block"
        boughtButton.parentNode.appendChild(notBought)
        // notBought.parentNode.parentNode.querySelector(".left .span").addEventListener("click", inputFieldCreator(notBought.parentNode.parentNode.querySelector(".left .span")))
        boughtButton.style.display = "none"
    };
}

function notBoughtFunction(notBoughtButton) {
    return function (event) {
        let textS     = notBoughtButton.parentNode.parentNode.querySelector(".left s")
        let textValue = textS.textContent
        let textSpan  = document.createElement("span")
        let bought    = document.createElement("button")
        const index   = items.findIndex(item => item.name === textValue);

        textSpan.addEventListener("click", inputFieldCreator(textSpan))

        bought.className = "bought"
        bought.textContent = "Куплено"
        bought.addEventListener("click", boughtFunction(bought))
        textSpan.innerText = textValue

        items[index].isBought = false
        localStorage.setItem("items", JSON.stringify(items))

        const spanTextArray = document.getElementsByClassName("text");

        for (let i = 0; i < spanTextArray.length; i++) {
            if (spanTextArray[i].innerText === textValue || spanTextArray[i].innerText.trim() === textValue) {
                const productDiv = spanTextArray[i].parentNode
                productDiv.parentNode.removeChild(productDiv)
                break
            }
        }

        let productDiv    = document.createElement("div")
        const textBought   = document.createElement("span")
        let shellDiv     = document.createElement("div")
        let amountBought = document.createElement("span")

        productDiv.className   = "product-item"
        textBought.className   = "text"
        shellDiv.className     = "shell"
        amountBought.className = "amount"

        textBought.innerText   = textValue + " "
        amountBought.innerText = items[index].quantity

        shellDiv.appendChild(amountBought)
        productDiv.appendChild(textBought)
        productDiv.appendChild(shellDiv)

        document.querySelector(".basket-second").appendChild(productDiv)

        notBoughtButton.parentNode.parentNode.querySelector(".center .subtract").style.display = "inline"
        notBoughtButton.parentNode.parentNode.querySelector(".center .add").style.display = "inline"
        notBoughtButton.parentNode.parentNode.querySelector(".left").removeChild(textS)
        notBoughtButton.parentNode.parentNode.querySelector(".left").appendChild(textSpan)

        notBoughtButton.parentNode.querySelector(".delete").style.display = "inline"
        notBoughtButton.parentNode.querySelector(".bought").style.display = "inline"
        notBoughtButton.style.display = "none"

        console.log(notBoughtButton.parentNode.parentNode.querySelector(".left span"))
    }
}

function changeOneItem(centerElement, counter) {
    return function (event) {
        if(centerElement.querySelector(".product-count").innerText !== "1" || counter === 1) {
            const count = centerElement.querySelector(".product-count")
            count.innerText = String(Number(count.innerText) + counter)
            const elementText = centerElement.parentNode.querySelector(".left span").innerText
            const elementIndex = items.findIndex(item => item.name === elementText)
            items[elementIndex].quantity = Number(count.innerText)
            items[elementIndex].isBought = false

            localStorage.setItem("items", JSON.stringify(items))

            const rightTextElements = document.getElementsByClassName("text")

            for(let j = 0; j < rightTextElements.length; j++) {
                if(rightTextElements[j].innerText.trim() === elementText) {
                    rightTextElements[j].parentNode.querySelector(".shell .amount").innerText = Number(count.innerText)
                }
            }
        }
    }
}


// document.getElementsByClassName("product-last")[0].querySelector(".delete").addEventListener("click", removeButtonHandler(document.getElementsByClassName("product-last")[0]));