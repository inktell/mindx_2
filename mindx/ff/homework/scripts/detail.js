const API_KEY = "b91df3ab37bbbcf654578f61a8ec5a80";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";

async function getMovieDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const source = urlParams.get('source'); // 'local' hoặc null
    const mediaType = urlParams.get('type') || 'movie';

    if (!movieId) {
        console.error("Không tìm thấy ID phim trên URL");
        return;
    }

    // --- TRƯỜNG HỢP 1: PHIM TỰ ĐĂNG (LOCAL) ---
    if (source === 'local') {
        const userMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
        
        // Tìm phim trong bộ nhớ bằng ID (Dùng == để so sánh String và Number)
        const movie = userMovies.find(m => m.id == movieId);

        if (movie) {
            console.log("Đang hiển thị phim nội bộ:", movie);
            renderPage(
                movie.title, 
                movie.desc || "Phim này chưa có mô tả nội dung.", 
                movie.image, 
                movie.video
            );
        } else {
            showError("Không tìm thấy dữ liệu phim trong bộ nhớ máy tính!");
        }
    } 
    // --- TRƯỜNG HỢP 2: PHIM TỪ API (TMDB) ---
    else {
        try {
            const resp = await fetch(`${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}&language=vi-VN`);
            const movieData = await resp.json();

            const videoResp = await fetch(`${BASE_URL}/${mediaType}/${movieId}/videos?api_key=${API_KEY}`);
            const videoData = await videoResp.json();
            
            // Lấy trailer từ YouTube
            const trailer = videoData.results.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
            const videoUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : "";
            const backdrop = movieData.backdrop_path ? IMG_URL + movieData.backdrop_path : movieData.poster_path ? IMG_URL + movieData.poster_path : "";

            renderPage(
                movieData.title || movieData.name, 
                movieData.overview, 
                backdrop, 
                videoUrl
            );
        } catch (error) {
            console.error("Lỗi API:", error);
            showError("Lỗi kết nối đến máy chủ phim!");
        }
    }
}

// Hàm đổ dữ liệu lên giao diện HTML
function renderPage(title, overview, backgroundImage, videoUrl) {
    document.title = title;
    
    // Gán thông tin văn bản
    const titleEl = document.getElementById("title");
    const overviewEl = document.getElementById("overview");
    const backgroundEl = document.getElementById("background-image");
    const videoContainer = document.getElementById("video-player");

    if (titleEl) titleEl.innerText = title;
    if (overviewEl) overviewEl.innerText = overview;
    
    // Gán ảnh nền
    if (backgroundEl) {
        backgroundEl.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(${backgroundImage})`;
    }

    // Xử lý trình phát Video
    if (videoContainer) {
        if (videoUrl) {
            // Tự động chuyển link YouTube thường sang link Embed
            let finalUrl = videoUrl.replace("watch?v=", "embed/");
            if (finalUrl.includes("youtu.be/")) {
                finalUrl = finalUrl.replace("youtu.be/", "youtube.com/embed/");
            }

            videoContainer.innerHTML = `
                <iframe width="100%" height="100%" 
                    src="${finalUrl}?autoplay=1&mute=0" 
                    frameborder="0" allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>`;
        } else {
            videoContainer.innerHTML = `<div class="no-video">Rất tiếc, video này hiện chưa khả dụng.</div>`;
        }
    }
}

function showError(msg) {
    const titleEl = document.getElementById("title");
    if (titleEl) titleEl.innerText = msg;
}

// Chạy hàm khi trang web tải xong
getMovieDetail();