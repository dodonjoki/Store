// 🎣 Dafzx Store v100.2 PROMAX++
// Fish It Glass Neon Edition 🐟
// Semua fitur aktif + suara + vtuber + animasi laut
// © 2025 Dafzx Joki & Store

// =============================
// 📦 Data Produk
// =============================
const produkData = [
  {
    nama: "Astral Rod",
    harga: 15000,
    gambar: "https://i.ibb.co/3rKp0G6/fishit1.png",
    deskripsi: "Pancing langka untuk mancing dewa 🎣"
  },
  {
    nama: "Ares Rod",
    harga: 20000,
    gambar: "https://i.ibb.co/z72gWrp/fishit2.png",
    deskripsi: "Senjata para pemancing profesional 💪"
  },
  {
    nama: "Angler Rod",
    harga: 25000,
    gambar: "https://cdn-offer-photos.zeusx.com/e1505222-1ca0-4180-80ff-37aeb1bda6c8.jpg",
    deskripsi: "Rod cepat & ringan untuk AFK mancing 🎯"
  },
  {
    nama: "Ghostfind Rod",
    harga: 30000,
    gambar: "https://i.ebayimg.com/images/g/sEQAAeSwfNxo23oh/s-l400.png",
    deskripsi: "Rod hantu yang bisa dapet rare item 👻"
  },
  {
    nama: "Mythic Rod",
    harga: 35000,
    gambar: "https://i.ibb.co/MR6F9jM/fishit3.png",
    deskripsi: "Rod dewa laut — hanya untuk elite mancing 🌊"
  },
  {
    nama: "Celestial Rod",
    harga: 40000,
    gambar: "https://i.ibb.co/RzqgsJp/fishit4.png",
    deskripsi: "Rod surgawi dengan kekuatan bintang ⭐"
  }
];

// =============================
// 🛒 Render Produk
// =============================
const produkList = document.getElementById("produkList");
const clickSound = document.getElementById("clickSound");

function renderProduk() {
  produkList.innerHTML = "";
  produkData.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produk-card glass";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp${p.harga.toLocaleString()}</strong></p>
      <button onclick="tambahKeranjang(${i})">Tambah</button>
    `;
    produkList.appendChild(card);
  });
}
renderProduk();

// =============================
// 🧺 Keranjang
// =============================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartPanel = document.getElementById("cartPanel");
const cartList = document.getElementById("cartList");

function toggleCart() {
  cartPanel.classList.toggle("active");
}
document.getElementById("toggleCart").addEventListener("click", toggleCart);

function tambahKeranjang(index) {
  const produk = produkData[index];
  const ada = cart.find(item => item.nama === produk.nama);
  clickSound.play(); // efek klik
  if (ada) ada.jumlah++;
  else cart.push({ ...produk, jumlah: 1 });
  simpanCart();
  renderCart();
}

function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.harga * item.jumlah;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} x${item.jumlah} - Rp${(item.harga * item.jumlah).toLocaleString()}
      <button onclick="hapusItem(${i})" style="float:right;background:red;color:white;border:none;border-radius:5px;padding:2px 6px;">X</button>
    `;
    cartList.appendChild(li);
  });
  document.getElementById("totalHarga").innerText = `Rp${total.toLocaleString()}`;
}
renderCart();

function hapusItem(i) {
  cart.splice(i, 1);
  simpanCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) return alert("Keranjang masih kosong!");
  let pesan = "Halo, saya mau order di Dafzx Store:\n\n";
  cart.forEach(item => {
    pesan += `• ${item.nama} x${item.jumlah} = Rp${(item.harga * item.jumlah).toLocaleString()}\n`;
  });
  const total = document.getElementById("totalHarga").innerText;
  pesan += `\nTotal: ${total}\n\nTerima kasih!`;

  window.open(`https://wa.me/6281266435034?text=${encodeURIComponent(pesan)}`);
}

// =============================
// 🌊 Efek Laut Interaktif
// =============================
document.addEventListener("mousemove", (e) => {
  const bg = document.querySelector(".background");
  const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
  bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
});
