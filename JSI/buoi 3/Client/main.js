// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEF-miiOOQ-yb42KTGYozNjUY8zImq2Ec",
  authDomain: "lesson3-b336e.firebaseapp.com",
  projectId: "lesson3-b336e",
  storageBucket: "lesson3-b336e.firebasestorage.app",
  messagingSenderId: "757879338973",
  appId: "1:757879338973:web:431390ad9fee86d23aa834",
  measurementId: "G-DQ1BM8DWMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global state
const state = {
  currentUser: null,
  userData: null,
  products: [],
  filteredProducts: [],
  cart: [],
  orders: [],
  guestOrders: [],
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'popular'
};

function saveGuestOrder(order) {
    const existing = JSON.parse(localStorage.getItem('guestOrders') || '[]');
    const updated = [...existing, order];
    localStorage.setItem('guestOrders', JSON.stringify(updated));
    state.guestOrders = updated;
}

function loadGuestOrders() {
    state.guestOrders = JSON.parse(localStorage.getItem('guestOrders') || '[]');
}

// Matrix effect
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg');
    const columns = 30;
    const rows = 20;

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 30}px`;
        column.style.animationDuration = `${Math.random() * 3 + 2}s`;
        column.style.animationDelay = `${Math.random() * 2}s`;

        let text = '';
        for (let j = 0; j < rows; j++) {
            text += Math.random() > 0.5 ? '0' : '1';
            text += '<br>';
        }
        column.innerHTML = text;
        matrixBg.appendChild(column);
    }
}

// Mock products data
function getMockProducts() {
    return [
        { id: 1, name: 'Laptop Dell XPS 13', category: 'electronics', price: 1200000, rating: 4.8, image: 'https://via.placeholder.com/300x200?text=Laptop' },
        { id: 2, name: 'iPhone 15 Pro', category: 'electronics', price: 28000000, rating: 4.9, image: 'https://via.placeholder.com/300x200?text=iPhone' },
        { id: 3, name: 'Áo sơ mi nam', category: 'fashion', price: 250000, rating: 4.5, image: 'https://via.placeholder.com/300x200?text=Shirt' },
        { id: 4, name: 'Quần jeans', category: 'fashion', price: 350000, rating: 4.6, image: 'https://via.placeholder.com/300x200?text=Jeans' },
        { id: 5, name: 'Gà rán', category: 'food', price: 45000, rating: 4.7, image: 'https://via.placeholder.com/300x200?text=Food' },
        { id: 6, name: 'Pizza', category: 'food', price: 65000, rating: 4.8, image: 'https://via.placeholder.com/300x200?text=Pizza' },
        { id: 7, name: 'Giường ngủ', category: 'home', price: 3500000, rating: 4.4, image: 'https://via.placeholder.com/300x200?text=Bed' },
        { id: 8, name: 'Bàn học', category: 'home', price: 800000, rating: 4.5, image: 'https://via.placeholder.com/300x200?text=Desk' },
    ];
}

// Load products
async function loadProducts() {
    try {
        state.products = getMockProducts();
        state.filteredProducts = [...state.products];
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Filter and sort products
function filterAndSortProducts() {
    let filtered = [...state.products];

    // Search filter
    if (state.searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    }

    // Category filter
    if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === state.selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
        switch(state.sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return 0;
        }
    });

    state.filteredProducts = filtered;
}

// Render products
function renderProducts() {
    const productsList = document.getElementById('productsList');
    const emptyState = document.getElementById('emptyState');

    if (state.filteredProducts.length === 0) {
        productsList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    productsList.innerHTML = state.filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-body">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString()} đ</div>
                <div class="product-rating">⭐ ${product.rating}</div>
                <div class="product-qty">
                    <label for="qty-${product.id}">Số lượng:</label>
                    <input type="number" id="qty-${product.id}" value="1" min="1" />
                </div>
                <div class="product-actions">
                    <button class="add-btn" onclick="addToCart({id: '${product.id}', name: '${product.name}', price: ${product.price}, image: '${product.image}'}, document.getElementById('qty-${product.id}').value)">
                        ➕ Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// Cart functions
window.addToCart = function(item, quantity = 1) {
    if (!state.currentUser) {
        showNotification('Cần đăng nhập để mua hàng', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 800);
        return;
    }

    let qty = Number(quantity) || 1;
    if (qty < 1) qty = 1;
    const existingItem = state.cart.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + qty;
    } else {
        state.cart.push({...item, quantity: qty});
    }
    updateCartUI();
    showNotification(`${item.name} đã thêm ${qty} chiếc vào giỏ hàng!`, 'success');
};

function handleSellClick() {
    if (!state.currentUser) {
        showNotification('Cần đăng nhập để bán hàng', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 800);
        return;
    }
    window.location.href = 'sell.html';
}

function updateCartUI() {
    const cartCount = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const countBadge = document.getElementById('cart-count');
    if (cartCount > 0) {
        countBadge.textContent = cartCount;
        countBadge.style.display = 'inline-block';
    } else {
        countBadge.style.display = 'none';
    }
}

window.handleWalletTopUp = async function(event) {
    event.preventDefault();

    if (!state.currentUser) {
        showNotification('Cần đăng nhập để nạp tiền', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 800);
        return;
    }

    const amountInput = document.getElementById('topUpAmount');
    if (!amountInput) return;

    const amount = Number(amountInput.value);
    if (!amount || amount < 10000) {
        showNotification('Số tiền nạp phải lớn hơn hoặc bằng 10.000 đ', 'error');
        return;
    }

    try {
        const currentBalance = state.userData?.wallet || 0;
        const newBalance = currentBalance + amount;
        const userRef = doc(db, 'users', state.currentUser.uid);
        await updateDoc(userRef, { wallet: newBalance });
        state.userData.wallet = newBalance;
        renderProfile();
        amountInput.value = '';
        showNotification(`Nạp ${amount.toLocaleString()} đ thành công!`, 'success');
    } catch (error) {
        console.error('Error topping up wallet:', error);
        showNotification('Nạp tiền thất bại. Vui lòng thử lại', 'error');
    }
};

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal >= 2000000 ? 0 : 15000;
    const orderFee = state.cart.length > 0 ? 5000 : 0;
    const discount = subtotal >= 2500000 ? 50000 : 0;
    const total = subtotal + shipping + orderFee - discount;

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#888;">Giỏ hàng trống</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (checkoutBtn) checkoutBtn.disabled = !state.currentUser;
        cartItems.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-content">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} đ x ${item.quantity || 1} = ${(item.price * (item.quantity || 1)).toLocaleString()} đ</div>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) - 1})">−</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
            </div>
        `).join('');
        document.getElementById('checkoutBtn').disabled = false;
    }

    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + ' đ';
    document.getElementById('shipping').textContent = shipping.toLocaleString() + ' đ';
    document.getElementById('orderFee').textContent = orderFee.toLocaleString() + ' đ';
    document.getElementById('discount').textContent = `- ${discount.toLocaleString()} đ`;
    document.getElementById('total').textContent = total.toLocaleString() + ' đ';
}

window.removeFromCart = function(itemId) {
    state.cart = state.cart.filter(i => i.id !== itemId);
    updateCartUI();
    renderCart();
};

window.updateQuantity = function(itemId, newQuantity) {
    if (newQuantity < 1) return;
    const item = state.cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        renderCart();
    }
};

// Page switching
window.switchPage = function(page) {
    document.querySelectorAll('.page-content').forEach(el => el.classList.remove('active'));
    document.getElementById(page + '-page').classList.add('active');

    if (page === 'cart') {
        renderCart();
    } else if (page === 'profile') {
        renderProfile();
    }
};

// Checkout
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            if (state.cart.length === 0) {
                showNotification('Giỏ hàng trống', 'error');
                return;
            }

            if (!state.currentUser) {
                showNotification('Cần đăng nhập để hoàn tất đặt hàng', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 800);
                return;
            }

            try {
                const subtotal = state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                const shipping = subtotal >= 2000000 ? 0 : 15000;
                const orderFee = 5000;
                const discount = subtotal >= 2500000 ? 50000 : 0;
                const total = subtotal + shipping + orderFee - discount;

                const isGuest = !state.currentUser;
                const guestOrderId = `guest-${Date.now()}`;
                const orderData = {
                    id: isGuest ? guestOrderId : null,
                    userId: state.currentUser?.uid || null,
                    guest: isGuest,
                    items: state.cart,
                    subtotal,
                    shipping,
                    orderFee,
                    discount,
                    total,
                    status: 'pending',
                    createdAt: isGuest ? new Date().toISOString() : serverTimestamp()
                };

                if (isGuest) {
                    saveGuestOrder(orderData);
                    showNotification('Đặt hàng thành công dưới tư cách khách!', 'success');
                } else {
                    const docRef = await addDoc(collection(db, 'orders'), orderData);
                    showNotification('Đặt hàng thành công!', 'success');
                }

                state.cart = [];
                updateCartUI();
                renderCart();
                loadOrders();
            } catch (error) {
                showNotification('Lỗi: ' + error.message, 'error');
            }
        });
    }
});

// Profile functions
function renderProfile() {
    const authContent = document.getElementById('authContent');
    const profileContent = document.getElementById('profileContent');

    if (state.currentUser) {
        authContent.style.display = 'none';
        profileContent.style.display = 'block';
        document.getElementById('profileName').textContent = state.userData?.name || 'Chưa cập nhật';
        document.getElementById('profileEmail').textContent = state.currentUser.email;
        document.getElementById('profilePhone').textContent = state.userData?.phone || 'Chưa cập nhật';
        document.getElementById('profileAddress').textContent = state.userData?.address || 'Chưa cập nhật';
        document.getElementById('profileBalance').textContent = `${(state.userData?.wallet || 0).toLocaleString()} đ`;
    } else {
        authContent.style.display = 'block';
        profileContent.style.display = 'none';
    }
}

function renderInfoSection() {
    const siteInfoUserContent = document.getElementById('siteInfoUserContent');
    if (!siteInfoUserContent) return;

    if (state.currentUser) {
        siteInfoUserContent.innerHTML = `
            <p><strong>Họ tên:</strong> ${state.userData?.name || 'Chưa có'}</p>
            <p><strong>Email:</strong> ${state.currentUser.email}</p>
            <p><strong>Số điện thoại:</strong> ${state.userData?.phone || 'Chưa có'}</p>
            <p><strong>Địa chỉ:</strong> ${state.userData?.address || 'Chưa có'}</p>
        `;
    } else {
        siteInfoUserContent.innerHTML = `
            <p>Bạn chưa đăng nhập. Vui lòng <a href="login.html">đăng nhập</a> hoặc <a href="signup.html">đăng ký</a> để xem thông tin cá nhân.</p>
        `;
    }
}

async function loadOrders() {
    if (state.currentUser) {
        try {
            const q = query(collection(db, 'orders'), where('userId', '==', state.currentUser.uid));
            const snapshot = await getDocs(q);
            state.orders = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        } catch (error) {
            console.error('Error loading orders:', error);
            state.orders = [];
        }
    }

    loadGuestOrders();
    renderOrders();
}

function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const sharedOrders = state.currentUser ? state.orders : state.guestOrders;
    const title = state.currentUser ? 'Đơn hàng của bạn' : 'Đơn hàng khách';

    if (!sharedOrders || sharedOrders.length === 0) {
        ordersList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#888;">Bạn chưa có đơn hàng nào</p>';
        return;
    }

    ordersList.innerHTML = sharedOrders.map(order => `
        <div class="order-card">
            <div style="margin-bottom:10px;">
                <strong>${state.currentUser ? 'Đơn #' : 'Đơn khách #'}</strong> ${order.id?.substring(0, 8) || ''}
            </div>
            <div class="summary-row">
                <span>Tổng tiền:</span>
                <span>${order.total?.toLocaleString() || 0} đ</span>
            </div>
            <div class="summary-row">
                <span>Trạng thái:</span>
                <span>${order.status || 'pending'}</span>
            </div>
            <div class="summary-row">
                <span>Số sản phẩm:</span>
                <span>${order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0}</span>
            </div>
        </div>
    `).join('');
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function showWebsiteContent() {
    const siteChoice = document.getElementById('site-choice');
    const siteInfo = document.getElementById('site-info');
    const app = document.querySelector('.app');

    if (siteChoice) siteChoice.style.display = 'none';
    if (siteInfo) siteInfo.style.display = 'none';
    if (app) {
        app.classList.remove('hidden');
        app.style.display = 'flex';
    }
}

function showStayInfo() {
    const siteChoice = document.getElementById('site-choice');
    const siteInfo = document.getElementById('site-info');
    const app = document.querySelector('.app');

    if (siteChoice) siteChoice.style.display = 'none';
    if (siteInfo) siteInfo.style.display = 'block';
    if (app) {
        app.classList.add('hidden');
        app.style.display = 'none';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleInfoLogout() {
    if (!auth.currentUser) {
        showNotification('Bạn chưa đăng nhập', 'info');
        return;
    }
    signOut(auth)
        .then(() => {
            showNotification('Đã đăng xuất thành công', 'success');
        })
        .catch((error) => {
            showNotification('Lỗi: ' + error.message, 'error');
        });
}

function handleInfoHome() {
    showWebsiteContent();
    switchPage('home');
}

// Modal functions
window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
};

window.handleLogoutCorner = function() {
    signOut(auth)
        .then(() => {
            showNotification('Đã đăng xuất! Ứng dụng sẽ tắt.', 'success');
            setTimeout(() => {
                window.close();
            }, 1500);
        })
        .catch((error) => {
            showNotification('Lỗi: ' + error.message, 'error');
        });
};

// Update corner buttons based on auth state
function updateCornerButtons(user) {
    const loginBtn = document.getElementById('login-btn-corner');
    const signupBtn = document.getElementById('signup-btn-corner');
    const logoutBtn = document.getElementById('logout-btn-corner');

    if (user) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Category navigation
document.addEventListener('DOMContentLoaded', () => {
    createMatrixEffect();
    loadProducts();

    document.querySelectorAll('.category-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.category-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            state.selectedCategory = item.dataset.category;
            filterAndSortProducts();
            renderProducts();
        });
    });

    const goWebsiteBtn = document.getElementById('goWebsiteBtn');
    const stayBtn = document.getElementById('stayBtn');
    const infoLogoutBtn = document.getElementById('infoLogoutBtn');
    const infoHomeBtn = document.getElementById('infoHomeBtn');

    if (goWebsiteBtn) goWebsiteBtn.addEventListener('click', showWebsiteContent);
    if (stayBtn) stayBtn.addEventListener('click', showStayInfo);
    if (infoLogoutBtn) infoLogoutBtn.addEventListener('click', handleInfoLogout);
    if (infoHomeBtn) infoHomeBtn.addEventListener('click', handleInfoHome);

    const authContent = document.getElementById('authContent');
    const profileContent = document.getElementById('profileContent');
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (mode === 'site') {
        showWebsiteContent();
    } else if (mode === 'info') {
        showStayInfo();
    }

    // Search
    loadGuestOrders();

    const headerSearch = document.getElementById('headerSearch');
    const mainSearch = document.getElementById('mainSearch');
    const sortSelect = document.getElementById('sortSelect');

    if (headerSearch) {
        headerSearch.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            if (mainSearch) mainSearch.value = state.searchQuery;
            filterAndSortProducts();
            renderProducts();
        });
    }

    if (mainSearch) {
        mainSearch.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            if (headerSearch) headerSearch.value = state.searchQuery;
            filterAndSortProducts();
            renderProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            filterAndSortProducts();
            renderProducts();
        });
    }

    const walletForm = document.getElementById('walletForm');
    if (walletForm) {
        walletForm.addEventListener('submit', handleWalletTopUp);
    }

    // Auth forms - các form auth giờ ở trang riêng (login.html, signup.html)
    // Loại bỏ tất cả event listeners cũ cho local auth forms

    // Auth state
    onAuthStateChanged(auth, async (user) => {
        state.currentUser = user;
        const authLinks = document.getElementById('auth-links');

        if (user) {
            state.userData = null;
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    state.userData = userDoc.data();
                    authLinks.innerHTML = `<span class="nav-link">Xin chào, ${state.userData.name || user.email}</span>`;
                } else {
                    authLinks.innerHTML = `<span class="nav-link">Xin chào, ${user.email}</span>`;
                }
            } catch (error) {
                console.error('Error getting user data:', error);
                authLinks.innerHTML = `<span class="nav-link">Xin chào, ${user.email}</span>`;
            }

            if (authContent) authContent.style.display = 'none';
            if (profileContent) profileContent.style.display = 'block';
            loadOrders();
        } else {
            state.userData = null;
            authLinks.innerHTML = '';
            if (authContent) authContent.style.display = 'block';
            if (profileContent) profileContent.style.display = 'none';
        }

        renderProfile();
        renderInfoSection();
        updateCornerButtons(user);
    });
});