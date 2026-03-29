const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', function () {
    menuLinks.classList.toggle('active');

    // Hiệu ứng xoay nút hamburger (tùy chọn)
    menu.classList.toggle('is-active');
});


// Lấy các phần tử từ DOM
const bookingForm = document.getElementById('booking-form');
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));

bookingForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Ngăn form gửi đi ngay lập tức

  // 1. Lấy dữ liệu từ các ô input
  const email = document.getElementById('user-email').value;
  const phone = document.getElementById('user-phone').value;
  const time = document.getElementById('booking-time').value;

  // 2. Đổ dữ bộ dữ liệu vào Modal
  document.getElementById('summary-email').innerText = email;
  document.getElementById('summary-phone').innerText = phone;
  document.getElementById('summary-time').innerText = time.replace('T', ' ');

  // 3. Hiển thị Modal
  confirmModal.show();
});

// Xử lý khi nhấn nút "Xác nhận gửi" cuối cùng
document.getElementById('final-submit').addEventListener('click', function() {
  alert('Cảm ơn bạn! Đơn đặt bàn đã được gửi thành công.');
  confirmModal.hide();
  bookingForm.reset(); // Xóa trắng form sau khi hoàn tất
});