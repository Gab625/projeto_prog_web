//Seleciona o botão
const botao = document.querySelector("#botao");

//Ao clicar, escolhe uma cor aleatória e aplica ao body
botao.addEventListener("click", function(){
    const cor = `hsl(${Math.random()*360}, 70%, 70%)`;
    document.body.style.background = cor;
});