const n1 = document.querySelector("#n1");
const n2 = document.querySelector("#n2");
const somar = document.querySelector("#somar");
const resultado = document.querySelector("#resultado");

somar.addEventListener("click", function () {
    const valor1 = parseFloat(n1.value);
    const valor2 = parseFloat(n2.value);

    if (isNaN(valor1) || isNaN(valor2)) {
        resultado.textContent = "Por favor, insira números válidos.";
        resultado.style.color = "red";
    } else {
        const soma = valor1 + valor2;
        resultado.textContent = `Resultado: ${soma}`;
        resultado.style.color = "black";

        // Salva a soma no localStorage (chave: 'ultimaSoma')
        // Armazena como string, pois localStorage só aceita strings
        localStorage.setItem('ultimaSoma', soma.toString());
        
        // Opcional: Salve também os valores originais para mostrar a operação completa
        localStorage.setItem('valor1', valor1.toString());
        localStorage.setItem('valor2', valor2.toString());
        
        // Opcional: Adicione um alerta ou mensagem para o usuário saber que foi salvo
        console.log("Soma salva no localStorage!");  // Visível no console do navegador (F12)
    }
});
