const entrada = document.querySelector("#entrada");
const add = document.querySelector("#add");
const aviso = document.querySelector("#aviso");

add.addEventListener("click", ()=>{
    const texto = entrada.value.trim();

    if(!texto){
        entrada.classList.add("erro");
        aviso.textContent = "Digite um valor antes de adicionar.";
        entrada.focus();
        return;
    }

    entrada.classList.remove("erro");
    aviso.textContent = "";
    //aqui iria a lógica do seu app (ex.: criar item)
    entrada.value = "";
    entrada.focus();
});