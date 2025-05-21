document.addEventListener('DOMContentLoaded', function() {
    // Contador del carrito
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    
    // Botones de compra
    const buyButtons = document.querySelectorAll('.ub-button');
    
    
    // Event listeners para los botones
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            updateCart();
            
            // Mostrar feedback visual
            const card = this.closest('.ub-model-card');
            card.classList.add('pulse');
            setTimeout(() => {
                card.classList.remove('pulse');
            }, 500);
        });
    });

    function mostrarFormulario() {
  document.getElementById("formulario").style.display = "block";
   }
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#carrito') {
                // Aquí podrías abrir un modal del carrito
                alert('Carrito de compras (funcionalidad por implementar)');
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Modal de personalización
const customizationModal = document.getElementById('customization-modal');
const closeModalBtn = document.querySelector('.ub-close-modal');
const colorOptions = document.querySelectorAll('.ub-color-option');
const strapOptions = document.querySelectorAll('.ub-strap-option');
const customTotalPrice = document.getElementById('custom-total-price');
const addToCartBtn = document.getElementById('ub-add-to-cart');

let currentProduct = null;
let currentPrice = 0;
let selectedColor = 'black';
let selectedStrap = 'silicone';
let strapPrice = 0;

// Abrir modal de personalización
document.querySelectorAll('.ub-button').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.ub-model-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.ub-model-price').textContent;
        const productImage = productCard.querySelector('img').src;
        
        // Configurar modal
        document.getElementById('custom-product-title').textContent = productName;
        document.getElementById('custom-product-price').textContent = productPrice;
        document.getElementById('main-custom-image').src = productImage;
        customTotalPrice.textContent = productPrice;
        
        // Extraer precio numérico
        currentPrice = parseInt(productPrice.replace(/[^0-9]/g, ''));
        
        // Mostrar modal
        customizationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(e) {
    if (e.target === customizationModal) {
        closeModal();
    }
});

function closeModal() {
    customizationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Seleccionar color
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        selectedColor = this.getAttribute('data-color');
        updateProductImage();
    });
});

// Seleccionar correa
strapOptions.forEach(option => {
    option.addEventListener('click', function() {
        strapOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        selectedStrap = this.getAttribute('data-strap');
        strapPrice = parseInt(this.getAttribute('data-price'));
        updateTotalPrice();
    });
});

// Actualizar precio total
function updateTotalPrice() {
    const total = currentPrice + strapPrice;
    customTotalPrice.textContent = `$${total.toLocaleString('es-MX')} MXN`;
}

// Actualizar imagen del producto (simulación)
function updateProductImage() {
    // Aquí podrías cambiar la imagen según el color seleccionado
    const mainImage = document.getElementById('main-custom-image');
    // mainImage.src = `ruta/a/imagen-${selectedColor}.jpg`;
}

// Agregar al carrito
addToCartBtn.addEventListener('click', function() {
    const product = {
        name: document.getElementById('custom-product-title').textContent,
        price: currentPrice + strapPrice,
        color: selectedColor,
        strap: selectedStrap,
        image: document.getElementById('main-custom-image').src
    };
    
    // Aquí agregarías el producto al carrito
    addToCart(product);
    closeModal();
    
    // Mostrar notificación
    alert(`${product.name} (${selectedColor}) ha sido agregado al carrito`);
});

// Función para agregar al carrito (simplificada)
function addToCart(product) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    // Aquí iría la lógica real para agregar items al carrito
}
});