document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('calc-form');
    const clearBtn = document.getElementById('clear-btn');
    const backBtn = document.getElementById('back-btn');
    const calcContainer = document.getElementById('calc-container');
    const resultContainer = document.getElementById('result-container');

    
    form.addEventListener('submit', function(e){
        e.preventDefault()
        calcularhoras()
    })


    function calcularhoras(){
        const salario = parseFloat(document.getElementById('salario').value);
        const horasT = parseInt(document.getElementById('horasT').value);
        const horasE = parseInt(document.getElementById('horasE').value);
        const minutosE = parseInt(document.getElementById('minutosE').value);
        const horasEDF = parseInt(document.getElementById('horasEDF').value);
        const minutosEDF = parseInt(document.getElementById('minutosEDF').value);


        if (isNaN(salario) || isNaN(horasT) || isNaN(horasE) || isNaN(minutosE) || isNaN(horasEDF) || isNaN(minutosEDF)) {
            alert("Por favor, preencha todos os campos corretamente!")
            return;
        }

        if (salario <= 0 || horasT <= 0 || horasE < 0 || minutosE < 0 || horasEDF < 0 || minutosEDF < 0) {
            alert('Os valores devem ser positivos.');
            return;
        }

        if (minutosE || minutosEDF >= 60){
            alert("Os minutos devem ser menores que 60")
            return;
        }

        const valorHoraNormal = salario / horasT;
        const valorHoraExtra = valorHoraNormal * 1.5;
        const valorHoraEDF = valorHoraNormal * 2.0;

        const horaTotalExtra = horasE + (minutosE / 60);
        const horaTotalExtraDF = horasEDF + (minutosEDF / 60);
        const totalExtrasDecimal = horaTotalExtra + horaTotalExtraDF;

        const totalExtra = valorHoraExtra * horaTotalExtra;
        const totalExtraDF = valorHoraEDF * horaTotalExtraDF;
        const totalReceber = totalExtra + totalExtraDF;

        const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        document.getElementById('sal-value').textContent = formatCurrency(salario);
        document.getElementById('horasT-value').textContent = `${horasT}h`;
        document.getElementById('extra-value').textContent = `${horaTotalExtra.toFixed(2)}h normais + ${horaTotalExtraDF.toFixed(2)}h EDF (total: ${totalExtrasDecimal.toFixed(2)}h)`;
        document.getElementById('extra-normal-value').textContent = `${horasE}h ${minutosE}min (${horaTotalExtra.toFixed(2)}h decimal)`;
        document.getElementById('extra-edf-value').textContent = `${horasEDF}h ${minutosEDF}min (${horaTotalExtraDF.toFixed(2)}h decimal)`;
        document.getElementById('total-extra-decimal').textContent = `${totalExtrasDecimal.toFixed(2)}h`;

        document.getElementById('normal-hour-value').textContent = formatCurrency(valorHoraNormal);
        document.getElementById('extra-hour-value').textContent = formatCurrency(valorHoraExtra);
        document.getElementById('extra-edf-hour-value').textContent = formatCurrency(valorHoraEDF);
        document.getElementById('normal-extra-total-value').textContent = formatCurrency(totalExtra);
        document.getElementById('edf-extra-total-value').textContent = formatCurrency(totalExtraDF);
        document.getElementById('total-value').textContent = formatCurrency(totalReceber);

        calcContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
}

     clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        form.reset();
        resultContainer.classList.add('hide');
        calcContainer.classList.remove('hide');
    })

     backBtn.addEventListener('click', function() {
        resultContainer.classList.add('hide');
        calcContainer.classList.remove('hide');
    })
})