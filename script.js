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
        cartItemsElement.innerHTML = `
            <div>
                <div>
                    <p>${item.name}</p>
                    <p>${item.quantity}</p>
                    <p>R$ ${item.price}</p>
                </div>

                <div>
                    <button>
                        Remover
                    </button>
                </div>

            </div>
        `

        cartItemsContainer.appendChild(cartItemsElement)
    })
}