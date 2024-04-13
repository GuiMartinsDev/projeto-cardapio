import {updateCartModal} from "../script.js"
export default function initOpenAndCloseModal() {
  const modalCart = document.querySelector("#modal-cart");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cartBtn = document.querySelector("#cart-btn");


  //Abrir o modal do carrinho
function openModalCart() {
  updateCartModal();
  modalCart.classList.remove("hidden");
  modalCart.classList.add("flex");
}
cartBtn.addEventListener("click", openModalCart);

//Fechar o modal do carrinho no clique do botao fechar
function closeModalCart() {
  modalCart.classList.remove("flex");
  modalCart.classList.add("hidden");
}
closeModalBtn.addEventListener("click", closeModalCart);

//Fechar o modal do carrinho no clique fora do modal
modalCart.addEventListener("click", (event) => {
  if(event.target === modalCart){
    modalCart.classList.remove("flex");
    modalCart.classList.add("hidden");
  }
})
}
