document.querySelector('form').addEventListener('submit', function (e) {
    // 1. Ngăn chặn form tải lại trang
    e.preventDefault();

    // 2. Lấy giá trị từ các ô input
    const userInput = document.getElementById('username').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // 3. Lưu dữ liệu đăng ký vào localStorage
    localStorage.setItem("db_name", userInput);
    localStorage.setItem("db_email", emailInput);
    localStorage.setItem("db_pass", passwordInput);
    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");

    // 4. Chuyển hướng sang trang Đăng nhập
    window.location.href = "login.html";
});
