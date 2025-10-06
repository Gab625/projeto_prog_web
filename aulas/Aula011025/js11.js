const lista = document.querySelector("#lista");
const btn = document.querySelector(".btn");

btn.addEventListener("click", ()=>{
    const li = document.createElement("li");
    li.textContent = "Item animado";
    li.classList.add("novo"); //anima só na entrada
    lista.appendChild(li);
})