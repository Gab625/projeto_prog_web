document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartSection = document.querySelector('#cart-section');
    const cartItemsDiv = document.querySelector('#cart-items');
    const cartTotalSpan = document.querySelector('#cart-total');
    const finalizeButton = document.querySelector('#finalize-button');
    const addButtons = document.querySelectorAll('.add-button');
    const receipt = document.querySelector('#receipt');
    const receiptItemsDiv = document.querySelector('#receipt-items');
    const orderIndexSpan = document.querySelector('#order-index');
    const orderDateSpan = document.querySelector('#order-date');
    const receiptTotalSpan = document.querySelector('#receipt-total');


    // Função para retornar o idx seja o salvo no local storage ou 0
    function nextOrderIndex() {
        let index = localStorage.getItem('orderIndex') || 0;
        index = parseInt(index) + 1;
        localStorage.setItem('orderIndex', index);
        return index;
    }

    // Função para formatar o valor em reais, usando API
    function formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    // Função para adicionar ao carro, passando o item e o preço
    // .find vai procurar no array, se há um item igual para realizar o incremendo na quantidade se nao adicionar um novo item
    function addToCart(itemName, price) {
        const existingItem = cart.find(cartItem => cartItem.item === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ item: itemName, price: parseFloat(price), quantity: 1 });
        }
        updateCart();
    }

    // Formatação do .inner para alterar o texto no html
    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        // Para cada item será passado o preço e a quantidade para ser multiplicado e calculado o valor total
        cart.forEach((cartItem, index) => {
            const subtotal = cartItem.price * cartItem.quantity;
            total += subtotal;
            
            // Alteração no html com a criação da div cartItem, e adicionando a classe cart-item e populando com o item, qtde e subtotal
            // Além d adiocionar um botao de remover que irá remover o item por índice
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${cartItem.item} (x${cartItem.quantity}) - ${formatPrice(subtotal)}</span>
                <button class="remove-button" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
        });

        cartTotalSpan.textContent = formatPrice(total);

        if (cart.length > 0) {
            cartSection.style.display = 'block'; // mostra enquanto está no loop
            finalizeButton.style.display = 'block';
        } else { 
            cartSection.style.display = 'none'; // esconde após o cart ser = 0
        }
    }

    // Remover uma porção do array com splice
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Finalizar pedido e imprimir nota
    finalizeButton.addEventListener('click', function() {
        if (cart.length === 0) return;

        const orderIndex = nextOrderIndex();
        const now = new Date().toLocaleString('pt-BR');
        let total = 0;

        // Popular a nota
        orderIndexSpan.textContent = orderIndex;
        orderDateSpan.textContent = now;
        receiptItemsDiv.innerHTML = '';

        // Para cada item no array cart realiza o codigo
        cart.forEach(cartItem => {
            const subtotal = cartItem.price * cartItem.quantity;
            total += subtotal;

            // Criação da div, classe CSS e colocar texto no HTML
            const receiptItemDiv = document.createElement('div');
            receiptItemDiv.classList.add('receipt-item');
            receiptItemDiv.innerHTML = `
                <span>${cartItem.item} (x${cartItem.quantity})</span>
                <span>${formatPrice(subtotal)}</span>
            `;
            receiptItemsDiv.append(receiptItemDiv);
        });

        receiptTotalSpan.textContent = formatPrice(total);

        // Limpar carrinho após finalização
        cart.length = 0;
        updateCart();

        // Mostrar e imprimir a nota
        receipt.style.display = 'block';
        window.print();
        receipt.style.display = 'none';
    });

    // Configuração para botões de adicionar
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const price = this.getAttribute('data-price');
            addToCart(itemName, price);
        });
    });
});
