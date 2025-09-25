const inputItem = document.querySelector("#item");
const botao = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");

botao.addEventListener("click", function() {
    const texto = inputItem.value.trim();
    if (texto === "") { return }
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
    
    inputItem.value = "";
    inputItem.focus();
})
