document.addEventListener("DOMContentLoaded", function () {
    // 1. Gọi hàm hiển thị thông tin ngay khi trang tải xong
    displayUserProfile();

    // 2. Lắng nghe sự kiện nếu bạn có nút "Chỉnh sửa" hoặc "Lưu" (tùy chọn)
    const editBtn = document.querySelector(".btn-edit-profile");
    if (editBtn) {
        editBtn.addEventListener("click", handleEditProfile);
    }
});

function displayUserProfile() {
    // Lấy dữ liệu từ localStorage (Phải khớp với Key lúc bạn Đăng nhập)
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const avatar = localStorage.getItem("userAvatar"); // Nếu bạn có lưu ảnh đại diện

    // Truy xuất các thẻ HTML (Hãy đảm bảo ID trong HTML của bạn trùng với các ID này)
    const nameEl = document.getElementById("display-name");
    const emailEl = document.getElementById("display-email");
    const avatarEl = document.getElementById("display-avatar");

    // Hiển thị Tên
    if (nameEl) {
        nameEl.innerText = name ? name : "Người dùng Netflix";
    }

    // Hiển thị Email
    if (emailEl) {
        emailEl.innerText = email ? email : "chưa cập nhật email";
    }

    // Hiển thị Avatar (Nếu không có thì dùng ảnh mặc định)
    if (avatarEl && avatar) {
        avatarEl.src = avatar;
    }
}

// Hàm này dùng nếu bạn muốn cho phép người dùng đổi tên trực tiếp
function handleEditProfile() {
    const newName = prompt("Nhập tên mới của bạn:", localStorage.getItem("userName"));
    if (newName && newName.trim() !== "") {
        localStorage.setItem("userName", newName);
        displayUserProfile(); // Cập nhật lại giao diện ngay lập tức
        alert("Đã cập nhật tên thành công!");
    }
}