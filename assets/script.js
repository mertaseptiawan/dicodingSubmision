let selectedPizzaName = "";
let selectedPizzaPrice = 0;
let totalPrice = 0;
let selectedToppingTotalPrice = 0;
let prevSelectedSize = 0;
let currentSelectedSize = 2;

const toppings = [
    {name: "Sausage", price: 10, pizza1: false, pizza2: true, pizza3: true},
    {name: "chiken", price: 10, pizza1: false, pizza2: false, pizza3: true},
    {name: "cheese", price: 10, pizza1: true, pizza2: true, pizza3: true},
    {name: "paprika", price: 10, pizza1: true, pizza2: true, pizza3: true},
    {name: "pineapple", price: 10, pizza1: true, pizza2: false, pizza3: true},
    {name: "Duck", price: 10, pizza1: false, pizza2: false, pizza3: true},
    ];

renderToppingOptions();

function renderToppingOptions() {
    const toppinElement = document.querySelector(".topping-container");
    toppinElement.innerHTML = "";

    toppings.forEach((topping) => {
        const container = document.createElement("div");
        container.classList = "item"
        
        const input = document.createElement("input");
        input.name = topping.name;
        input.value = topping.price;
        input.id = topping.name;
        input.type = "checkbox";
        input.addEventListener("change", function(e) {
            if (e.target.checked) {
                totalPrice += parseInt(e.target.value);
            } else {
                totalPrice -= parseInt(e.target.value)
            }
            renderTotalPrice();
        })

        if (selectedPizzaName === "pizza-1" && !topping.pizza1) {
            input.disabled = true;
        } else if (selectedPizzaName === "pizza-2" && !topping.pizza2) {
            input.disabled = true;
        } else if (selectedPizzaName === "pizza-3" && !topping.pizza3) {
            input.disabled = true;
        }

        const label = document.createElement("label");
        label.htmlFor = topping.name;
        label.innerHTML = topping.name;

        container.appendChild(input);
        container.appendChild(label);

        toppinElement.appendChild(container)
    });
}

function choosePizza(e) {
    selectedPizzaPrice = parseInt(e.value);
    selectedPizzaName = e.id;
    selectedToppingTotalPrice = 0;
    totalPrice = 0;
    
    if (selectedPizzaPrice) {
        if (currentSelectedSize < 2) {
            totalPrice -= 1;
        } else if (currentSelectedSize > 2) {
            totalPrice += 2;
        }
    
        calculatePrice();
    
        renderToppingOptions()
    }
}

function calculatePrice() {
    totalPrice = totalPrice + selectedPizzaPrice + selectedToppingTotalPrice;

    renderTotalPrice();
}

function renderTotalPrice() {
    const priceElement = document.querySelector(".total-price");
    priceElement.innerHTML = "Rp. " +  totalPrice + "k";
}