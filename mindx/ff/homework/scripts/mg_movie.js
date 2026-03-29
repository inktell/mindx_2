function displayUserInfo() {
    // Lấy dữ liệu từ localStorage
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    
    // Tìm các thẻ HTML để hiển thị (Thay ID cho đúng với HTML của bạn)
    const nameEl = document.getElementById("display-name") || document.getElementById("nav-user-name");
    const emailEl = document.getElementById("display-email");

    if (name && nameEl) {
        nameEl.innerText = name;
    }
    if (email && emailEl) {
        emailEl.innerText = email;
    }
}

// Chạy hàm ngay khi trang web tải xong
document.addEventListener("DOMContentLoaded", displayUserInfo);

// 1. Lấy danh sách phim từ localStorage (nếu có) hoặc tạo mảng rỗng
let myMovies = JSON.parse(localStorage.getItem("userMovies")) || [];

function renderAdminMovies() {
    const listContainer = document.getElementById("admin-movie-list");
    listContainer.innerHTML = "";

    myMovies.forEach((movie, index) => {
        const movieCard = document.createElement("div");
        movieCard.className = "admin-card";
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="admin-card-info">
                <h4>${movie.title}</h4>
                <div class="admin-btns">
                    <button onclick="editMovie(${index})" class="btn-edit">Sửa</button>
                    <button onclick="deleteMovie(${index})" class="btn-delete">Xóa</button>
                </div>
            </div>
        `;
        listContainer.appendChild(movieCard);
    });
}

// 2. Thêm hoặc Cập nhật phim
function saveMovie() {
    const title = document.getElementById("movie-title").value;
    const image = document.getElementById("movie-image").value;
    const video = document.getElementById("movie-video").value;
    const desc = document.getElementById("movie-desc").value;
    const editIndex = document.getElementById("edit-movie-index").value;

    if (!title || !image || !video) return alert("Vui lòng nhập đủ thông tin!");

    if (editIndex === "") {
        // TRƯỜNG HỢP: THÊM MỚI
        const newMovie = {
            id: Date.now().toString(),
            title, image, video, desc
        };
        myMovies.push(newMovie);
    } else {
        // TRƯỜNG HỢP: CẬP NHẬT (SỬA)
        // Giữ nguyên ID cũ, chỉ cập nhật thông tin mới
        myMovies[editIndex] = {
            id: myMovies[editIndex].id, 
            title, image, video, desc
        };
    }

    localStorage.setItem("userMovies", JSON.stringify(myMovies));
    
    alert(editIndex === "" ? "Thêm phim thành công!" : "Cập nhật thành công!");
    resetForm(); // Reset form thay vì reload nếu muốn trải nghiệm mượt hơn
    renderAdminMovies(); // Vẽ lại danh sách ngay lập tức
}

// 3. Xóa phim
function deleteMovie(index) {
    if (confirm("Bạn có chắc muốn xóa phim này?")) {
        myMovies.splice(index, 1); // Xóa 1 phần tử tại vị trí index
        localStorage.setItem("userMovies", JSON.stringify(myMovies));
        renderAdminMovies();
    }
}

// 4. Đưa dữ liệu phim lên form để sửa
function editMovie(index) {
    const movie = myMovies[index];
    document.getElementById("movie-title").value = movie.title;
    document.getElementById("movie-image").value = movie.image;
    document.getElementById("movie-desc").value = movie.desc;
    // Đổ link video vào ô input
    document.getElementById("movie-video").value = movie.video || ""; 
    document.getElementById("edit-movie-index").value = index;

    document.getElementById("btn-save").innerText = "Cập nhật Phim";
    document.getElementById("btn-cancel").style.display = "inline-block";
}

function resetForm() {
    document.getElementById("movie-title").value = "";
    document.getElementById("movie-image").value = "";
    document.getElementById("movie-desc").value = "";
    document.getElementById("edit-movie-index").value = "";
    document.getElementById("btn-save").innerText = "Thêm Phim Mới";
    document.getElementById("btn-cancel").style.display = "none";
}

renderAdminMovies();

function renderVideo(videoUrl) {
    const videoContainer = document.getElementById("video-player");
    if (!videoContainer) return;

    if (videoUrl) {
        let finalUrl = videoUrl;

        // Tự động sửa link nếu bạn dán link YouTube thường
        if (finalUrl.includes("youtube.com/watch?v=")) {
            finalUrl = finalUrl.replace("watch?v=", "embed/");
        } 
        // Tự động sửa link nếu bạn dán link rút gọn youtu.be
        else if (finalUrl.includes("youtu.be/")) {
            finalUrl = finalUrl.replace("youtu.be/", "youtube.com/embed/");
        }

        // Thêm tham số để video chạy mượt hơn
        videoContainer.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                src="${finalUrl}?autoplay=1&rel=0" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>`;
    } else {
        videoContainer.innerHTML = "<p>Video không khả dụng</p>";
    }
}