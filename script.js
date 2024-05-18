/*Elementos do menu*/
const menu = document.getElementById("menu");
/*botão do carrinho*/
const cartBtn = document.getElementById("cart-btn");
/** elementos do modal */
const cartModal = document.getElementById("cart-modal");
/**Itens do container - carrinho */
const cartItemsContainer = document.getElementById("cart-items");
/**Texto do total */
const cartTotal = document.getElementById("cart-total");
/*botão de checkout*/
const checkoutBtn = document.getElementById("checkout-btn");
/**fechar modal */
const closeModalBtn = document.getElementById("close-modal-btn");
/**numero de contador do carrinho */
const cartCounter = document.getElementById("cart-count");
/**input endereço */
const addressInput = document.getElementById("address");
/*aviso endereço*/
const addressWarn = document.getElementById("address-warn");

//lista do carrinho
let cart = [];

/**evento para abrir o modal do carrinho*/
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//evento para fechar o modal pelo botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

//pagando os itens de menu
menu.addEventListener("click", function(event){
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")
    console.log(parentButton);

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        //adicionar no carrinho
        addToCart(name, price)
    }
})

//função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity +=1
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

//atualiza e exibir no carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item=> {
        const cartItemsElement = document.createElement("div")
        cartItemsElement.classList.add("flex", "justify-between", "md-4", "flex-col")

        cartItemsElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>

            </div>
        `

        total += item.price * item.quantity;
        
        cartItemsContainer.appendChild(cartItemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

// Remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item=> item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

// pegar o que for digitado em input
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressWarn.classList.add("hidden")
        addressInput.classList.remove("border-red-500")
    }
})

// finalizar pedido no carrinho
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text: "O restaurante esta fechado!",
            duration: 5000,
            close: true,
            gravit: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    // enviar pedido para a api do whatsapp
    const cartItems = cart.map((item)=>{
        return(
            `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} | `
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "21968917243"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

// verificar a hora e manupular o horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-500")
} else {
    spanItem.classList.remove("bg-green-500")
    spanItem.classList.add("bg-red-500")
}