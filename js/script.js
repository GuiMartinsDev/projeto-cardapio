import initAnimaScroll from "./modules/anima-scroll.js";
import initOpenAndCloseModal from "./modules/abrir-fechar-modal.js";

export {updateCartModal}

initAnimaScroll();
initOpenAndCloseModal();


const menu = document.getElementById("menu");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const nameClientInput = document.getElementById("name-client");
const nameClientWarn = document.getElementById("name-client-warn");


let cart = [];


menu.addEventListener("click", function(event) {
  let parentButton = event.target.closest(".add-to-cart-btn");
  if(parentButton) {    

    // let spanParentButton = parentButton.querySelector("span");
    const name = parentButton.getAttribute("data-name");
    const price = Number(parentButton.getAttribute("data-price"));

    Toastify({
      text: `${name} adicionado ao carrinho!`,
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#389638",
      },
    }).showToast();

    addToCart(name, price)
  }
})

//Função para adicionar no carrinho

function addToCart(name, price) {
  // let quantity = +spanParentButton.innerText;
  // quantity++;
  // spanParentButton.innerText = quantity;
  const existingItem = cart.find((item) => item.name === name)

  if(existingItem){
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    })
  }

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: <b>${item.quantity}</b></p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2).toString().replace(".", ",")}</p>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">
          Remover
        </button>
      </div>
    `

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
  cartCounter.innerText = cart.length;

}

//Função  para remover item do carrinho

cartItemsContainer.addEventListener("click", (event) => {
  if(event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
})

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if(index !== -1) {
    const item = cart[index];
    
    if(item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", (event) => {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
})

nameClientInput.addEventListener("input", (event) => {
  let nameInputValue = event.target.value;

  if (nameInputValue !== "") {
    nameClientInput.classList.remove("border-red-500");
    nameClientWarn.classList.add("hidden");
  }
})

checkoutBtn.addEventListener("click", () => {

  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    Toastify({
      text: "Ops o restaurante está fechado!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();

    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }
  if (nameClientInput.value === "") {
    nameClientWarn.classList.remove("hidden");
    nameClientInput.classList.add("border-red-500");
    return;
  }

  //Enviar o pedido para api whats
  const cartItems = cart.map((item) => {
    return (
      ` ${item.name}, Quantidade: (${item.quantity}), Preço: R$${item.price.toFixed(2).toString().replace(".", ",")} |`
    )
  }).join("")

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  })
  const totalString = total.toFixed(2).toString().replace(".", ",");

  const message = encodeURIComponent(cartItems);
  const phone = "14997995132";

  window.open(`https://wa.me/${phone}?text=${message} [ Total: R$${totalString} | Nome: ${nameClientInput.value} | Endereço: ${addressInput.value} ]`, "_blank");

  cart = [];
  nameClientInput.value = "";
  addressInput.value = "";
  updateCartModal();
})

function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}