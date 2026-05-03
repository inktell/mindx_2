import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl1v4j0DMx-ce4rkGZpmijzyUYLLRm9NI",
  authDomain: "bai-3-2f0fc.firebaseapp.com",
  projectId: "bai-3-2f0fc",
  storageBucket: "bai-3-2f0fc.firebasestorage.app",
  messagingSenderId: "300263576892",
  appId: "1:300263576892:web:55c18b93e96985c55b3a39",
  measurementId: "G-38NJ0S7XEP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function renderOrders(orders) {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    if (!orders || orders.length === 0) {
        orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#888;">Bạn chưa có đơn hàng nào.</p>';
        return;
    }

    orderList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div style="margin-bottom:10px;">
                <strong>Đơn #${order.id.substring(0, 8)}</strong>
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
                <span>${order.items?.length || 0}</span>
            </div>
        </div>
    `).join('');
}

async function loadUserOrders(user) {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        showNotification('Không thể tải đơn hàng. Vui lòng thử lại sau.', 'error');
        orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#888;">Đã xảy ra lỗi khi tải đơn hàng.</p>';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const orderList = document.getElementById('orderList');
    if (!orderList) return;

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            orderList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#888;">Vui lòng <a href="login.html">đăng nhập</a> để xem đơn hàng.</p>';
            return;
        }

        loadUserOrders(user);
    });
});
