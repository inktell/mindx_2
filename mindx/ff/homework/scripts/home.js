// 1. Cấu hình các hằng số
const API_KEY = "b91df3ab37bbbcf654578f61a8ec5a80";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";

// 2. Các đường dẫn API
const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=vi-VN`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
};

// 3. Khởi chạy ứng dụng
async function initApp() {
    try {
        const response = await fetch(requests.fetchNetflixOriginals);
        const data = await response.json();
        
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        renderBanner(randomMovie);

        createMovieRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals, true);
        createMovieRow("Xu hướng", requests.fetchTrending);
        createMovieRow("Phim Hành Động", requests.fetchActionMovies);
        createMovieRow("Phim Hài", requests.fetchComedyMovies);
        createMovieRow("Phim Kinh Dị", requests.fetchHorrorMovies);

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

// 4. Hàm hiển thị Banner
function renderBanner(movie) {
    const banner = document.getElementById("banner");
    const title = document.getElementById("banner_title");
    const desc = document.getElementById("banner_description");

    banner.style.backgroundImage = `url(${IMG_URL}${movie.backdrop_path})`;
    title.innerText = movie.name || movie.title || movie.original_name;
    
    desc.innerText = movie.overview?.length > 150 
        ? movie.overview.substring(0, 150) + "..." 
        : movie.overview;

    // Click vào nút Play trên banner cũng chuyển sang trang chi tiết
    const playBtn = document.querySelector(".banner__button");
    if(playBtn) {
        playBtn.onclick = () => {
            window.location.href = `detail.html?id=${movie.id}&type=tv`;
        };
    }
}

// 5. Hàm tạo hàng phim
async function createMovieRow(title, fetchUrl, isLarge = false) {
    const response = await fetch(fetchUrl);
    const data = await response.json();

    const mainContent = document.getElementById("main-content");
    const row = document.createElement("div");
    row.classList.add("row");

    const rowTitle = document.createElement("h2");
    rowTitle.innerText = title;
    row.appendChild(rowTitle);

    const postersContainer = document.createElement("div");
    postersContainer.classList.add("row__posters");

    data.results.forEach((movie) => {
        if (movie.poster_path && movie.backdrop_path) {
            const poster = document.createElement("img");
            poster.classList.add("row__poster");
            if (isLarge) poster.classList.add("row__posterLarge");

            poster.src = `${IMG_URL}${isLarge ? movie.poster_path : movie.backdrop_path}`;
            
            // XỬ LÝ CLICK: Chuyển hướng kèm ID và TYPE (movie hoặc tv)
            poster.onclick = () => {
                const mediaType = movie.media_type || (isLarge ? "tv" : "movie");
                window.location.href = `detail.html?id=${movie.id}&type=${mediaType}`;
            };
            
            postersContainer.appendChild(poster);
        }
    });

    row.appendChild(postersContainer);
    mainContent.appendChild(row);
}

function displayUserMovies() {
    const userMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
    const mainContent = document.getElementById("main-content");
    
    if (userMovies.length === 0) return;

    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<h2>PHIM CỦA TÔI</h2><div class="row__posters" id="user-row"></div>`;
    mainContent.prepend(row); // Đưa lên đầu trang

    const userRow = document.getElementById("user-row");
    userMovies.forEach(movie => {
        const img = document.createElement("img");
        img.className = "row__poster row__posterLarge";
        img.src = movie.image;
        userRow.appendChild(img);
    });
}

// Hàm hiển thị danh sách phim do người dùng tự đăng
function renderUserMoviesRow() {
    // 1. Lấy dữ liệu từ localStorage
    const myMovies = JSON.parse(localStorage.getItem("userMovies")) || [];

    // 2. Nếu không có phim nào thì không hiển thị hàng này
    if (myMovies.length === 0) return;

    // 3. Tìm nơi chứa các hàng phim trên trang chủ
    const mainContent = document.getElementById("main-content");

    // 4. Tạo cấu trúc Row giống hệt Netflix
    const row = document.createElement("div");
    row.classList.add("row");

    // Tiêu đề hàng
    const title = document.createElement("h2");
    title.innerText = "PHIM CỦA TÔI";
    row.appendChild(title);

    // Container chứa các poster
    const postersContainer = document.createElement("div");
    postersContainer.classList.add("row__posters");

    // 5. Duyệt qua mảng phim tự đăng để tạo Poster
    myMovies.forEach((movie) => {
        const poster = document.createElement("img");
        poster.classList.add("row__poster", "row__posterLarge"); // Sử dụng kích thước lớn cho nổi bật
        
        // Link ảnh từ dữ liệu bạn đã nhập
        poster.src = movie.image;
        poster.alt = movie.title;

        // Xử lý khi click vào phim tự đăng
        poster.onclick = () => {
            // Chuyển sang trang detail kèm tham số source=local để JS biết đường lấy dữ liệu
            window.location.href = `detail.html?id=${movie.id}&source=local`;
        };

        postersContainer.appendChild(poster);
    });

    row.appendChild(postersContainer);

    // 6. Đưa hàng phim này vào trang chủ (prepend để đưa lên trên cùng các hàng khác)
    mainContent.prepend(row);
}

// Gọi hàm này khi trang web khởi động
document.addEventListener("DOMContentLoaded", renderUserMoviesRow);

initApp();