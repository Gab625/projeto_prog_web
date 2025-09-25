const n1 = document.querySelector("#n1");
const n2 = document.querySelector("#n2");
const botao = document.querySelector("#somar");
const resultado = document.querySelector("#resultado");

botao.addEventListener("click", function(){
    const num1 = Number(n1.value);
    const num2 = Number(n2.value);

    if(isNaN(num1) || isNaN(num2)){
        resultado.textContent = "Por favor, digite números válidos";
        resultado.style.color = "red";
    }else{
        const soma = num1+num2;
        resultado.textContent = `Resultado: ${soma}`;
        resultado.style.color = "green";
    }
});