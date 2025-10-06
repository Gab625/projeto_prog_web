const nota = document.querySelector("#nota");

//carrega ao abrir
nota.value = localStorage.getItem("minhaNota") || "";

//salva a cada digitação
nota.addEventListener("input", ()=>{
    localStorage.setItem("minhaNota", nota.value);
});