let segredo = Math.floor(Math.random() * 10) + 1;

const input = document.querySelector("#palpite");
const botao = document.querySelector("#verificar");
const resultado = document.querySelector("#resultado");

botao.addEventListener("click", function() {
    const palpite = Number(input.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 10) {
        resultado.textContent = "Digite um número válido de 1 a 10!";
        resultado.style.color = "red";
        return;
    }
    if (palpite === segredo) {
        resultado.textContent = "Parabéns! Você acertou!";
        resultado.style.color = "green";
        segredo = Math.floor(Math.random() * 10) + 1;
    } else if (palpite < segredo) {
        resultado.textContent = "O número é maior."
        resultado.style.color = "orange";
    } else {
        resultado.textContent = "O número é menor."
        resultado.style.color = "orange";
    }
    input.value = "";
    input.focus();
});
