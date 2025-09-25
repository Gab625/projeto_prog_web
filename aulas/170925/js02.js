//Seleciona os elementos pelo id
const titulo = document.querySelector("#titulo");
const botao = document.querySelector("#botao");

//Quando o botão for clicado...
botao.addEventListener("click", function(){
    titulo.textContent = "Texto alterado com Javascript!";
});