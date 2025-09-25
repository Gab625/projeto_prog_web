const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
   const cor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    document.body.style.background = cor;
});
