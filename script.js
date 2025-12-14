// Cart Management
let cart = [];

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const modalClose = document.getElementById('modal-close');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add to Cart Functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseInt(this.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();
        showNotification('محصول به سبد خرید اضافه شد');

        // Add animation to button
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Update Cart Display
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">سبد خرید شما خالی است</p>';
        cartTotalElement.textContent = '۰ تومان';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>تعداد: ${item.quantity}</p>
                <p class="cart-item-price">${formatPrice(itemTotal)} تومان</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = `${formatPrice(total)} تومان`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('محصول از سبد خرید حذف شد');
}

// Format Price (Add commas)
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #d4af37;
        color: #000;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    
    // Show success message
    showNotification('پیام شما با موفقیت ارسال شد');
    
    // Reset form
    contactForm.reset();
});

// Checkout Button
document.querySelector('.btn-checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است');
        return;
    }
    
    showNotification('در حال انتقال به صفحه پرداخت...');
    
    // Here you would typically redirect to payment page
    setTimeout(() => {
        alert('این یک نمونه است. در نسخه واقعی به صفحه پرداخت منتقل می‌شوید.');
    }, 1500);
});

// Quick View Buttons (placeholder functionality)
document.querySelectorAll('.btn-quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        showNotification('نمایش سریع محصول');
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
updateCart();