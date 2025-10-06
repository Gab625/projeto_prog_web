const btn = document.querySelector("#toggle"); //aqui "toggle" é referência a ID
btn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark"); //aqui "toggle" é uma classe
})