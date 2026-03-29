const list = document.getElementById("pokemon-list");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const detail = document.getElementById("pokemon-detail");
const closeBtn = document.getElementById("close");
const spriteDisplay = document.getElementById("pokemon-sprite-display");

let allPokemon = [];

// 1. Tải dữ liệu 151 Pokemon đời đầu
async function fetchPokemon() {
    try {
        const promises = [];
        for (let i = 1; i <= 151; i++) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
        }
        allPokemon = await Promise.all(promises);
        displayPokemon(allPokemon);
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu Pokemon:", error);
    }
}

// 2. Hiển thị danh sách Pokemon vào màn hình bên phải
function displayPokemon(pokemons) {
    list.innerHTML = "";
    pokemons.forEach(poke => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${poke.sprites.front_default}" alt="${poke.name}">
            <h3>${poke.name}</h3>
        `;
        card.onclick = () => showDetail(poke);
        list.appendChild(card);
    });
}

// 3. Hiển thị thông tin chi tiết khi bấm vào một Pokemon
async function showDetail(poke) {
    // Hiện Modal
    modal.classList.remove("hidden");
    
    // Cập nhật ảnh Pokemon lên màn hình bãi biển bên trái
    if (spriteDisplay) {
        spriteDisplay.src = poke.sprites.other['official-artwork'].front_default;
    }

    // Lấy mô tả (Flavor Text) và Hệ tiến hóa từ Species API
    try {
        const speciesRes = await fetch(poke.species.url);
        const speciesData = await speciesRes.json();
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');

        // Đổ dữ liệu vào HTML
        detail.innerHTML = `
            <div class="detail-header">
                <h2 id="detail-name">#${poke.id} ${poke.name}</h2>
                <div id="detail-types">
                    ${poke.types.map(t => `<span class="type-badge" style="background-color: ${getTypeColor(t.type.name)}">${t.type.name}</span>`).join("")}
                </div>
            </div>
            
            <div class="detail-body">
                <div class="stats-container">
                    <strong>BASE STATS</strong>
                    ${poke.stats.map(s => `
                        <div class="stat-row">
                            <span class="stat-label">${s.stat.name.replace('special-', 'sp-')}</span>
                            <div class="stat-bar-bg">
                                <div class="stat-bar-fill" style="width: ${(s.base_stat / 200) * 100}%; background-color: ${getStatColor(s.stat.name)}"></div>
                            </div>
                            <span class="stat-number">${s.base_stat}</span>
                        </div>
                    `).join("")}
                </div>
                
                <div class="abilities">
                    <strong>Abilities:</strong> 
                    <span id="detail-abilities">${poke.abilities.map(a => a.ability.name).join(", ")}</span>
                </div>
                
                <div class="description-box">
                    <strong>Pokedex Entry:</strong>
                    <p id="detail-desc">${description ? description.flavor_text.replace(/\f/g, ' ') : "No description available."}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết loài:", error);
    }
}

// 4. Hàm bổ trợ: Màu sắc cho Hệ Pokemon
function getTypeColor(type) {
    const colors = {
        fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030', 
        psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8', dark: '#705848', 
        fairy: '#EE99AC', bug: '#A8B820', fighting: '#C03028', poison: '#A040A0', 
        ground: '#E0C068', flying: '#A890F0', rock: '#B8A038', ghost: '#705898', 
        steel: '#B8B8D0', normal: '#A8A878'
    };
    return colors[type] || '#777';
}

// 5. Hàm bổ trợ: Màu sắc cho Thanh chỉ số (Stats)
function getStatColor(stat) {
    const colors = {
        hp: '#FF0000', 
        attack: '#F08030', 
        defense: '#F8D030', 
        'special-attack': '#6890F0', 
        'special-defense': '#78C850', 
        speed: '#F85888'
    };
    return colors[stat] || '#ccc';
}

// 6. Xử lý đóng Modal
closeBtn.onclick = () => modal.classList.add("hidden");
window.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
};

// 7. Xử lý tìm kiếm Pokemon
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    const filtered = allPokemon.filter(p => p.name.includes(value));
    displayPokemon(filtered);
});

// Chạy ứng dụng
fetchPokemon();