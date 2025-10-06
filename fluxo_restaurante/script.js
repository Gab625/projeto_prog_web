// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const cart = []; // Array para itens do carrinho: {item: string, price: number, quantity: number}
    const cartSection = document.querySelector('#cart');
    const cartItemsDiv = document.querySelector('#cart-items');
    const cartTotalSpan = document.querySelector('#cart-total');
    const finalizeButton = document.querySelector('#finalize-button');
    const addButtons = document.querySelectorAll('.add-button');
    const receipt = document.querySelector('#receipt');
    const receiptItemsDiv = document.querySelector('#receipt-items');
    const orderIndexSpan = document.querySelector('#order-index');
    const orderDateSpan = document.querySelector('#order-date');
    const receiptTotalSpan = document.querySelector('#receipt-total');

    // Gerar próximo índice de pedido (sequencial, persistido no localStorage)
    function getNextOrderIndex() {
        let index = localStorage.getItem('orderIndex') || 0;
        index = parseInt(index) + 1;
        localStorage.setItem('orderIndex', index);
        return index;
    }

    // Formatar preço como moeda brasileira
    function formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    // Adicionar item ao carrinho
    function addToCart(itemName, price) {
        const existingItem = cart.find(cartItem => cartItem.item === itemName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ item: itemName, price: parseFloat(price), quantity: 1 });
        }
        updateCartDisplay();
    }

    // Atualizar exibição do carrinho
    function updateCartDisplay() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        cart.forEach((cartItem, index) => {
            const subtotal = cartItem.price * cartItem.quantity;
            total += subtotal;

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
            cartSection.style.display = 'block';
            finalizeButton.style.display = 'block';
        } else {
            cartSection.style.display = 'none';
        }
    }

    // Remover item do carrinho
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    // Finalizar pedido e imprimir nota
    finalizeButton.addEventListener('click', function() {
        if (cart.length === 0) return;

        const orderIndex = getNextOrderIndex();
        const now = new Date().toLocaleString('pt-BR');
        let total = 0;

        // Popular a nota
        orderIndexSpan.textContent = orderIndex;
        orderDateSpan.textContent = now;
        receiptItemsDiv.innerHTML = '';

        cart.forEach(cartItem => {
            const subtotal = cartItem.price * cartItem.quantity;
            total += subtotal;

            const receiptItemDiv = document.createElement('div');
            receiptItemDiv.classList.add('receipt-item');
            receiptItemDiv.innerHTML = `
                <span>${cartItem.item} (x${cartItem.quantity})</span>
                <span>${formatPrice(subtotal)}</span>
            `;
            receiptItemsDiv.appendChild(receiptItemDiv);
        });

        receiptTotalSpan.textContent = formatPrice(total);

        // Limpar carrinho após finalização
        cart.length = 0;
        updateCartDisplay();

        // Mostrar e imprimir a nota
        receipt.style.display = 'block';
        window.print();
        receipt.style.display = 'none'; // Ocultar após impressão
    });

    // Event listeners para botões de adicionar
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const price = this.getAttribute('data-price');
            addToCart(itemName, price);
        });
    });
});
